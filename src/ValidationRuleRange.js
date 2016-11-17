define("connectsdk.ValidationRuleRange", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleRange = function(json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        this.maxValue = json.attributes.maxValue;
		this.minValue = json.attributes.minValue;
		
		this.validate = function(value) {
			if (isNaN(value)) {
				return false;
			}
			value = Number(value);
			return this.minValue <= value && value <= this.maxValue;
		};
	};

	connectsdk.ValidationRuleRange = ValidationRuleRange;
	return ValidationRuleRange;
});