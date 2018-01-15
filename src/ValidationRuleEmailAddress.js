define("connectsdk.ValidationRuleEmailAddress", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleEmailAddress = function(json) {
		this.json = json;
		this.type = json.type,
		this.errorMessageId = json.type;

		this.validate = function(value) {
			var regexp = new RegExp(/^[^@\.]+(\.[^@\.]+)*@([^@\.]+\.)*[^@\.]+\.[^@\.][^@\.]+$/i);
			return regexp.test(value);
		};
	};

	connectsdk.ValidationRuleEmailAddress = ValidationRuleEmailAddress;
	return ValidationRuleEmailAddress;
});