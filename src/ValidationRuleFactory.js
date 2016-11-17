define("connectsdk.ValidationRuleFactory", ["connectsdk.core", "connectsdk.ValidationRuleEmailAddress", "connectsdk.ValidationRuleExpirationDate", "connectsdk.ValidationRuleFixedList", "connectsdk.ValidationRuleLength", "connectsdk.ValidationRuleLuhn", "connectsdk.ValidationRuleRange", "connectsdk.ValidationRuleRegularExpression"], function(connectsdk, ValidationRuleEmailAddress, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression) {

	var ValidationRuleFactory = function () {
	    
	    this.makeValidator = function(json) {
            // create new class based on the rule
            var classType = json.type.charAt(0).toUpperCase() + json.type.slice(1), // camel casing
                className = eval("ValidationRule" + classType);
            return new className(json);
        };
	};

	connectsdk.ValidationRuleFactory = ValidationRuleFactory;
	return ValidationRuleFactory;
});