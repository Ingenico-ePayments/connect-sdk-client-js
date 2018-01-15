define("connectsdk.ValidationRuleTermsAndConditions", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleTermsAndConditions = function(json) {
		this.json = json;
		this.type = json.type,
		this.errorMessageId = json.type;

		this.validate = function(value) {
			return true === value || "true" === value;
		};
	};

	connectsdk.ValidationRuleTermsAndConditions = ValidationRuleTermsAndConditions;
	return ValidationRuleTermsAndConditions;
});