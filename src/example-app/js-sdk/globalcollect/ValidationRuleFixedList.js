define("GCsdk.ValidationRuleFixedList", ["GCsdk.core"], function(GCsdk) {

	var ValidationRuleFixedList = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
		this.allowedValues = json.attributes.allowedValues;
		
		this.validate = function (value) {
			for (var i = 0, il = this.allowedValues.length; i < il; i++) {
				if (this.allowedValues[i] === value) {
					return true;
				}
			}
			return false;
		};
	};

	GCsdk.ValidationRuleFixedList = ValidationRuleFixedList;
	return ValidationRuleFixedList;
});