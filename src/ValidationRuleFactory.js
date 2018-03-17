define("connectsdk.ValidationRuleFactory", ["connectsdk.core", "connectsdk.ValidationRuleEmailAddress", "connectsdk.ValidationRuleTermsAndConditions", "connectsdk.ValidationRuleExpirationDate", "connectsdk.ValidationRuleFixedList", "connectsdk.ValidationRuleLength", "connectsdk.ValidationRuleLuhn", "connectsdk.ValidationRuleRange", "connectsdk.ValidationRuleRegularExpression", "connectsdk.ValidationRuleBoletoBancarioRequiredness", "connectsdk.ValidationRuleIban"], function (connectsdk, ValidationRuleEmailAddress, ValidationRuleTermsAndConditions, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression, ValidationRuleBoletoBancarioRequiredness, ValidationRuleIban) {

    var ValidationRuleFactory = function () {

        this.makeValidator = function (json) {
            // create new class based on the rule
            try {
                var classType = json.type.charAt(0).toUpperCase() + json.type.slice(1), // camel casing
                    className = eval("ValidationRule" + classType);
                return new className(json);
            } catch (e) {
                console.warn('no validator for ', classType);
            }
            return null;
        };
    };

    connectsdk.ValidationRuleFactory = ValidationRuleFactory;
    return ValidationRuleFactory;
});