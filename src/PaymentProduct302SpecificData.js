define("connectsdk.PaymentProduct302SpecificData", ["connectsdk.core"], function(connectsdk) {

	var PaymentProduct302SpecificData = function (json) {
		this.json = json;
		this.networks = json.networks;
	};

	connectsdk.PaymentProduct302SpecificData = PaymentProduct302SpecificData;
	return PaymentProduct302SpecificData;
});