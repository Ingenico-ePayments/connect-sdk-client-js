define("GCsdk.LabelTemplateElement", ["GCsdk.core"], function(GCsdk) {

	var LabelTemplateElement = function (json) {
		this.json = json;
		this.attributeKey = json.attributeKey;
		this.mask = json.mask;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	GCsdk.LabelTemplateElement = LabelTemplateElement;
	return LabelTemplateElement;
});