define("connectsdk.PublicKeyResponse", ["connectsdk.core"], function(connectsdk) {

	var PublicKeyResponse = function(json) {
		this.json = json;
		this.keyId = json.keyId;
		this.publicKey = json.publicKey;
	};

	connectsdk.PublicKeyResponse = PublicKeyResponse;
	return PublicKeyResponse;
});