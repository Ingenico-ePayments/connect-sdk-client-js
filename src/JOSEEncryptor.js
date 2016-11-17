define("connectsdk.JOSEEncryptor", ["connectsdk.core"], function(connectsdk) {

	var pki = forge.pki;
	var asn1 = forge.asn1;
	var CEKKEYLENGTH = 512;
	var IVLENGTH = 128;

	var base64UrlEncode = function(str) {
		str = forge.util.encode64(str);
		str = str.split('=')[0];
		str = str.replace(/\+/g, '-');
		str = str.replace(/\//g, '_');
		return str;
	};

	var createProtectedHeader = function(kid) {
		var JOSEHeader = {
			"alg" : "RSA-OAEP",
			"enc" : "A256CBC-HS512",
			"kid" : kid
		};
		return JSON.stringify(JOSEHeader);
	};

	var decodePemPublicKey = function(publickeyB64Encoded) {
		// step 1: base64decode
		var publickeyB64Decoded = forge.util.decode64(publickeyB64Encoded);
		// create a bytebuffer with these bytes
		var buffer2 = forge.util.createBuffer(publickeyB64Decoded, 'raw');
		// convert DER to ASN1 object
		var publickeyObject2 = forge.asn1.fromDer(buffer2);
		// convert to publicKey object
		var publicKey2 = pki.publicKeyFromAsn1(publickeyObject2);
		return publicKey2;
	};

	var encryptContentEncryptionKey = function(CEK, publicKey) {
		// encrypt CEK with OAEP+SHA-1+MGF1Padding
		var encryptedCEK = publicKey.encrypt(CEK, 'RSA-OAEP');
		return encryptedCEK;
	};

	var encryptPayload = function(payload, encKey, initializationVector) {
		var cipher = forge.cipher.createCipher('AES-CBC', encKey);
		cipher.start({
			iv : initializationVector
		});
		cipher.update(forge.util.createBuffer(payload));
		cipher.finish();
		return cipher.output.bytes();
	};

	var calculateAdditionalAuthenticatedDataLength = function(encodededProtectedHeader) {
		var buffer = forge.util.createBuffer(encodededProtectedHeader);
		var lengthInBits = buffer.length() * 8;

		var buffer2 = forge.util.createBuffer();
		// convert int to 64bit big endian
		buffer2.putInt32(0);
		buffer2.putInt32(lengthInBits);
		return buffer2.bytes();
	};

	var calculateHMAC = function(macKey, encodededProtectedHeader, initializationVector, cipherText, al) {
		var buffer = forge.util.createBuffer();
		buffer.putBytes(encodededProtectedHeader);
		buffer.putBytes(initializationVector);
		buffer.putBytes(cipherText);
		buffer.putBytes(al);

		var hmacInput = buffer.bytes();

		var hmac = forge.hmac.create();
		hmac.start(forge.sha512.create(), macKey);
		hmac.update(hmacInput);
		return hmac.digest().bytes();
	};

	var JOSEEncryptor = function() {

		this.encrypt = function(plainTextValues, publicKeyResponse) {
			// Create protected header and encode it with Base64 encoding
			var payload = JSON.stringify(plainTextValues);
			var protectedHeader = createProtectedHeader(publicKeyResponse.keyId);
			var encodededProtectedHeader = base64UrlEncode(protectedHeader);

			// Create ContentEncryptionKey, is a random byte[]
			var CEK = forge.random.getBytesSync(CEKKEYLENGTH / 8);
			var publicKey = decodePemPublicKey(publicKeyResponse.publicKey);

			// Encrypt the contentEncryptionKey with the GC gateway publickey and encode it with Base64 encoding
			var encryptedContentEncryptionKey = encryptContentEncryptionKey(CEK, publicKey);
			var encodedEncryptedContentEncryptionKey = base64UrlEncode(encryptedContentEncryptionKey);

			// Split the contentEncryptionKey in ENC_KEY and MAC_KEY for using hmac
			var macKey = CEK.substring(0, CEKKEYLENGTH / 2 / 8);
			var encKey = CEK.substring(CEKKEYLENGTH / 2 / 8);

			// Create Initialization Vector
			var initializationVector = forge.random.getBytesSync(IVLENGTH / 8);
			var encodededinitializationVector = base64UrlEncode(initializationVector);

			// Encrypt content with ContentEncryptionKey and Initialization Vector
			var cipherText = encryptPayload(payload, encKey, initializationVector);
			var encodedCipherText = base64UrlEncode(cipherText);

			// Create Additional Authenticated Data  and Additional Authenticated Data Length
			var al = calculateAdditionalAuthenticatedDataLength(encodededProtectedHeader);

			// Calculates HMAC
			var calculatedHmac = calculateHMAC(macKey, encodededProtectedHeader, initializationVector, cipherText, al);

			// Truncate HMAC Value to Create Authentication Tag
			var authenticationTag = calculatedHmac.substring(0, calculatedHmac.length / 2);
			var encodedAuthenticationTag = base64UrlEncode(authenticationTag);

			return encodededProtectedHeader + "." + encodedEncryptedContentEncryptionKey + "." + encodededinitializationVector + "." + encodedCipherText + "." + encodedAuthenticationTag;
		};
	};

	connectsdk.JOSEEncryptor = JOSEEncryptor;
	return JOSEEncryptor;
});