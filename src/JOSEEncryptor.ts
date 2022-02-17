///<amd-module name="connectsdk.JOSEEncryptor"/>

import * as forge from "node-forge";
import PublicKeyResponse = require("./PublicKeyResponse");

const CEKKEYLENGTH = 512;
const IVLENGTH = 128;

function base64UrlEncode(str: string): string {
  str = forge.util.encode64(str);
  str = str.split("=")[0];
  str = str.replace(/\+/g, "-");
  str = str.replace(/\//g, "_");
  return str;
}

function createProtectedHeader(kid: string): string {
  const JOSEHeader = {
    alg: "RSA-OAEP",
    enc: "A256CBC-HS512",
    kid: kid,
  };
  return JSON.stringify(JOSEHeader);
}

function decodePemPublicKey(publickeyB64Encoded: string): forge.pki.rsa.PublicKey {
  // step 1: base64decode
  const publickeyB64Decoded = forge.util.decode64(publickeyB64Encoded);
  // create a bytebuffer with these bytes
  const buffer2 = forge.util.createBuffer(publickeyB64Decoded, "raw");
  // convert DER to ASN1 object
  const publickeyObject2 = forge.asn1.fromDer(buffer2);
  // convert to publicKey object
  const publicKey2 = forge.pki.publicKeyFromAsn1(publickeyObject2);
  return publicKey2 as forge.pki.rsa.PublicKey;
}

function encryptContentEncryptionKey(CEK: string, publicKey: forge.pki.rsa.PublicKey): string {
  // encrypt CEK with OAEP+SHA-1+MGF1Padding
  const encryptedCEK = publicKey.encrypt(CEK, "RSA-OAEP");
  return encryptedCEK;
}

function encryptPayload(payload: string, encKey: string, initializationVector: string): string {
  const cipher = forge.cipher.createCipher("AES-CBC", encKey);
  cipher.start({
    iv: initializationVector,
  });
  cipher.update(forge.util.createBuffer(payload));
  cipher.finish();
  return cipher.output.bytes();
}

function calculateAdditionalAuthenticatedDataLength(encodededProtectedHeader: string): string {
  const buffer = forge.util.createBuffer(encodededProtectedHeader);
  const lengthInBits = buffer.length() * 8;

  const buffer2 = forge.util.createBuffer();
  // convert int to 64bit big endian
  buffer2.putInt32(0);
  buffer2.putInt32(lengthInBits);
  return buffer2.bytes();
}

function calculateHMAC(macKey: string, encodededProtectedHeader: string, initializationVector: string, cipherText: string, al: string): string {
  const buffer = forge.util.createBuffer();
  buffer.putBytes(encodededProtectedHeader);
  buffer.putBytes(initializationVector);
  buffer.putBytes(cipherText);
  buffer.putBytes(al);

  const hmacInput = buffer.bytes();

  const hmac = forge.hmac.create();
  hmac.start("sha512", macKey);
  hmac.update(hmacInput);
  return hmac.digest().bytes();
}

class JOSEEncryptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encrypt(plainTextValues: any, publicKeyResponse: PublicKeyResponse): string {
    // Create protected header and encode it with Base64 encoding
    const payload = JSON.stringify(plainTextValues);
    const protectedHeader = createProtectedHeader(publicKeyResponse.keyId);
    const encodededProtectedHeader = base64UrlEncode(protectedHeader);

    // Create ContentEncryptionKey, is a random byte[]
    const CEK = forge.random.getBytesSync(CEKKEYLENGTH / 8);
    const publicKey = decodePemPublicKey(publicKeyResponse.publicKey);

    // Encrypt the contentEncryptionKey with the GC gateway publickey and encode it with Base64 encoding
    const encryptedContentEncryptionKey = encryptContentEncryptionKey(CEK, publicKey);
    const encodedEncryptedContentEncryptionKey = base64UrlEncode(encryptedContentEncryptionKey);

    // Split the contentEncryptionKey in ENC_KEY and MAC_KEY for using hmac
    const macKey = CEK.substring(0, CEKKEYLENGTH / 2 / 8);
    const encKey = CEK.substring(CEKKEYLENGTH / 2 / 8);

    // Create Initialization Vector
    const initializationVector = forge.random.getBytesSync(IVLENGTH / 8);
    const encodededinitializationVector = base64UrlEncode(initializationVector);

    // Encrypt content with ContentEncryptionKey and Initialization Vector
    const cipherText = encryptPayload(payload, encKey, initializationVector);
    const encodedCipherText = base64UrlEncode(cipherText);

    // Create Additional Authenticated Data  and Additional Authenticated Data Length
    const al = calculateAdditionalAuthenticatedDataLength(encodededProtectedHeader);

    // Calculates HMAC
    const calculatedHmac = calculateHMAC(macKey, encodededProtectedHeader, initializationVector, cipherText, al);

    // Truncate HMAC Value to Create Authentication Tag
    const authenticationTag = calculatedHmac.substring(0, calculatedHmac.length / 2);
    const encodedAuthenticationTag = base64UrlEncode(authenticationTag);

    return encodededProtectedHeader + "." + encodedEncryptedContentEncryptionKey + "." + encodededinitializationVector + "." + encodedCipherText + "." + encodedAuthenticationTag;
  }
}

export = JOSEEncryptor;
