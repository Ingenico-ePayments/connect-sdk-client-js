define("GCsdk.PublicKeyResponse", ["GCsdk.core"], function(GCsdk) {

	var PublicKeyResponse = function(json) {
		this.json = json;
		this.keyId = json.keyId;
		this.publicKey = json.publicKey;
	};

	GCsdk.PublicKeyResponse = PublicKeyResponse;
	return PublicKeyResponse;
});