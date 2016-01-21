define("GCsdk.DataRestrictions", ["GCsdk.core", "GCsdk.ValidationRuleExpirationDate", "GCsdk.ValidationRuleFixedList", "GCsdk.ValidationRuleLength", "GCsdk.ValidationRuleLuhn", "GCsdk.ValidationRuleRange", "GCsdk.ValidationRuleRegularExpression", "GCsdk.ValidationRuleEmailAddress", "GCsdk.ValidationRuleFactory"], function(GCsdk, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression, ValidationRuleEmailAddress, ValidationRuleFactory) {

	var DataRestrictions = function (json, mask) {

		var _parseJSON = function (_json, _validationRules, _validationRuleByType) {
		    var validationRuleFactory = new ValidationRuleFactory();
			if (_json.validators) {
				for (var key in _json.validators) {
					var validationRule = validationRuleFactory.makeValidator({type: key, attributes: _json.validators[key]});
					_validationRules.push(validationRule);
					_validationRuleByType[validationRule.type] = validationRule;
				}
			}
		};

		this.json = json;
		this.isRequired = json.isRequired;
		this.validationRules = [];
		this.validationRuleByType = {};
		
		_parseJSON(json, this.validationRules, this.validationRuleByType);
	};

	GCsdk.DataRestrictions = DataRestrictions;
	return DataRestrictions;
});