define("connectsdk.PaymentProductDisplayHints", ["connectsdk.core"], function(connectsdk) {

	var PaymentProductDisplayHints = function (json) {
		this.json = json;
		this.displayOrder = json.displayOrder;
		this.label = json.label;
		this.logo = json.logo;
	};

	connectsdk.PaymentProductDisplayHints = PaymentProductDisplayHints;
	return PaymentProductDisplayHints;
});