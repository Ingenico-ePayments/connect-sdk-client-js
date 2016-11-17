define("connectsdk.AccountOnFile", ["connectsdk.core" ,"connectsdk.AccountOnFileDisplayHints", "connectsdk.Attribute"], function(connectsdk, AccountOnFileDisplayHints, Attribute) {

	var _parseJSON = function (_json, _attributes, _attributeByKey) {
		if (_json.attributes) {
			for (var i = 0, l = _json.attributes.length; i < l; i++) {
				var attribute = new Attribute(_json.attributes[i]);
				_attributes.push(attribute);
				_attributeByKey[attribute.key] = attribute;
			}
		}
	};

	var AccountOnFile = function (json) {
		var that = this;
		this.json = json;
		this.attributes = [];
		this.attributeByKey = {};
		this.displayHints = new AccountOnFileDisplayHints(json.displayHints);
		this.id = json.id;
		this.paymentProductId = json.paymentProductId;

		this.getMaskedValueByAttributeKey = function(attributeKey) {
			var value = this.attributeByKey[attributeKey].value;
			var wildcardMask;
			try {
				wildcardMask = this.displayHints.labelTemplateElementByAttributeKey[attributeKey].wildcardMask;
			} catch (e) {}
			if (value !== undefined && wildcardMask !== undefined) {
				var maskingUtil = new connectsdk.MaskingUtil();
				return maskingUtil.applyMask(wildcardMask, value);
			}
			return undefined;
		};

		_parseJSON(json, this.attributes, this.attributeByKey);
	};

	connectsdk.AccountOnFile = AccountOnFile;
	return AccountOnFile;
});