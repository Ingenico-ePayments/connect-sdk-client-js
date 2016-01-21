define("GCsdk.PaymentProductDisplayHints", ["GCsdk.core"], function(GCsdk) {

	var PaymentProductDisplayHints = function (json) {
		this.json = json;
		this.displayOrder = json.displayOrder;
		this.label = json.label;
		this.logo = json.logo;
	};

	GCsdk.PaymentProductDisplayHints = PaymentProductDisplayHints;
	return PaymentProductDisplayHints;
});