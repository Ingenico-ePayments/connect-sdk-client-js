define("connectsdk.ValidationRuleFactory", ["connectsdk.core", "connectsdk.ValidationRuleEmailAddress", "connectsdk.ValidationRuleTermsAndConditions", "connectsdk.ValidationRuleExpirationDate", "connectsdk.ValidationRuleFixedList", "connectsdk.ValidationRuleLength", "connectsdk.ValidationRuleLuhn", "connectsdk.ValidationRuleRange", "connectsdk.ValidationRuleRegularExpression", "connectsdk.ValidationRuleBoletoBancarioRequiredness", "connectsdk.ValidationRuleIban", "connectsdk.ValidationRuleResidentIdNumber"], function (connectsdk, ValidationRuleEmailAddress, ValidationRuleTermsAndConditions, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression, ValidationRuleBoletoBancarioRequiredness, ValidationRuleIban, ValidationRuleResidentIdNumber) {

    
    var validationRules = {
        EmailAddress : ValidationRuleEmailAddress, 
        TermsAndConditions: ValidationRuleTermsAndConditions, 
        ExpirationDate : ValidationRuleExpirationDate, 
        FixedList : ValidationRuleFixedList, 
        Length : ValidationRuleLength, 
        Luhn: ValidationRuleLuhn, 
        Range: ValidationRuleRange, 
        RegularExpression: ValidationRuleRegularExpression, 
        BoletoBancarioRequiredness: ValidationRuleBoletoBancarioRequiredness, 
        Iban: ValidationRuleIban,
        ResidentIdNumber: ValidationRuleResidentIdNumber
    }
    
    
    var ValidationRuleFactory = function () {
        this.makeValidator = function (json) {
            try {
                var rule = json.type.charAt(0).toUpperCase() + json.type.slice(1);
                return new validationRules[rule](json);
            } catch (e) {
                console.warn('no validator for ', rule);
            }
            return null;
        };
    };

    connectsdk.ValidationRuleFactory = ValidationRuleFactory;
    return ValidationRuleFactory;
});