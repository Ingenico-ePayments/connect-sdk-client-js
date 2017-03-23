define("connectsdk.ValidationRuleBoletoBancarioRequiredness", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleBoletoBancarioRequiredness = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        this.fiscalNumberLength = json.attributes.fiscalNumberLength;
		
		this.validate = function (value, fiscalNumberValue) {
			return (fiscalNumberValue.length === this.fiscalNumberLength && value.length > 0) || fiscalNumberValue.length !== this.fiscalNumberLength;
		};
	};

	connectsdk.ValidationRuleBoletoBancarioRequiredness = ValidationRuleBoletoBancarioRequiredness;
	return ValidationRuleBoletoBancarioRequiredness;
});