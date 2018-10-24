define("connectsdk.PaymentProduct320SpecificData", ["connectsdk.core"], function(connectsdk) {

	var PaymentProduct320SpecificData = function (json) {
		this.json = json;
		this.networks = json.networks;
	};

	connectsdk.PaymentProduct320SpecificData = PaymentProduct320SpecificData;
	return PaymentProduct320SpecificData;
});