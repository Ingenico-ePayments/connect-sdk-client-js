define("connectsdk.AccountOnFileDisplayHints", ["connectsdk.core", "connectsdk.LabelTemplateElement"], function(connectsdk, LabelTemplateElement) {

	var _parseJSON = function (_json, _labelTemplate, _labelTemplateElementByAttributeKey) {
		if (_json.labelTemplate) {
			for (var i = 0, l = _json.labelTemplate.length; i < l; i++) {
				var labelTemplateElement = new LabelTemplateElement(_json.labelTemplate[i]);
				_labelTemplate.push(labelTemplateElement);
				_labelTemplateElementByAttributeKey[labelTemplateElement.attributeKey] = labelTemplateElement;
			}
		}
	};

	var AccountOnFileDisplayHints = function (json) {
		this.json = json;
		this.labelTemplate = [];
		this.labelTemplateElementByAttributeKey = {};

		_parseJSON(json, this.labelTemplate, this.labelTemplateElementByAttributeKey);
	};

	connectsdk.AccountOnFileDisplayHints = AccountOnFileDisplayHints;
	return AccountOnFileDisplayHints;
});