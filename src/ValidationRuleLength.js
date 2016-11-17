define("connectsdk.ValidationRuleLength", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleLength = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        this.maxLength = json.attributes.maxLength;
		this.minLength = json.attributes.minLength;
		
		this.validate = function (value) {
			return this.minLength <= value.length && value.length <= this.maxLength;
		};
	};

	connectsdk.ValidationRuleLength = ValidationRuleLength;
	return ValidationRuleLength;
});