define("connectsdk.LabelTemplateElement", ["connectsdk.core"], function(connectsdk) {

	var LabelTemplateElement = function (json) {
		this.json = json;
		this.attributeKey = json.attributeKey;
		this.mask = json.mask;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	connectsdk.LabelTemplateElement = LabelTemplateElement;
	return LabelTemplateElement;
});