define("connectsdk.PaymentProductPublicKeyResponse", ["connectsdk.core"], function(connectsdk) {

	var PaymentProductPublicKeyResponse = function(json) {
		this.json = json;
		this.keyId = json.keyId;
		this.publicKey = json.publicKey;
	};

	connectsdk.PaymentProductPublicKeyResponse = PaymentProductPublicKeyResponse;
	return PaymentProductPublicKeyResponse;
});