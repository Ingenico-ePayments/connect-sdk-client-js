define("GCsdk.PaymentProductFieldDisplayHints", ["GCsdk.core", "GCsdk.Tooltip", "GCsdk.FormElement"], function(GCsdk, Tooltip, FormElement) {

	var PaymentProductFieldDisplayHints = function (json) {
		this.json = json;
 		this.displayOrder = json.displayOrder;
		this.formElement = new FormElement(json.formElement);
		this.label = json.label;
		this.mask = json.mask;
		this.obfuscate = json.obfuscate;
		this.placeholderLabel = json.placeholderLabel;
		this.preferredInputType = json.preferredInputType;
		this.tooltip = json.tooltip? new Tooltip(json.tooltip): undefined;
		this.alwaysShow = json.alwaysShow;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	GCsdk.PaymentProductFieldDisplayHints = PaymentProductFieldDisplayHints;
	return PaymentProductFieldDisplayHints;
});