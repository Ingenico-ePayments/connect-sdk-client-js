define("GCsdk.ValidationRuleFactory", ["GCsdk.core", "GCsdk.ValidationRuleEmailAddress", "GCsdk.ValidationRuleExpirationDate", "GCsdk.ValidationRuleFixedList", "GCsdk.ValidationRuleLength", "GCsdk.ValidationRuleLuhn", "GCsdk.ValidationRuleRange", "GCsdk.ValidationRuleRegularExpression"], function(GCsdk, ValidationRuleEmailAddress, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression) {

	var ValidationRuleFactory = function () {
	    
	    this.makeValidator = function(json) {
            // create new class based on the rule
            var classType = json.type.charAt(0).toUpperCase() + json.type.slice(1), // camel casing
                className = eval("ValidationRule" + classType);
            return new className(json);
        };
	};

	GCsdk.ValidationRuleFactory = ValidationRuleFactory;
	return ValidationRuleFactory;
});