define("connectsdk.PaymentProduct863SpecificData", ["connectsdk.core"], function(connectsdk) {

	var PaymentProduct863SpecificData = function (json) {
		this.json = json;
		this.integrationTypes = json.integrationTypes;
	};

	connectsdk.PaymentProduct863SpecificData = PaymentProduct863SpecificData;
	return PaymentProduct863SpecificData;
});