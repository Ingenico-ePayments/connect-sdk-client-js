define("connectsdk.PaymentProductField", ["connectsdk.core", "connectsdk.PaymentProductFieldDisplayHints", "connectsdk.DataRestrictions", "connectsdk.MaskingUtil"], function(connectsdk, PaymentProductFieldDisplayHints, DataRestrictions, MaskingUtil) {
	var PaymentProductField = function (json) {
		this.json = json;
		this.displayHints = new PaymentProductFieldDisplayHints(json.displayHints);
		this.dataRestrictions = new DataRestrictions(json.dataRestrictions, this.displayHints.mask);
		this.id = json.id;
		this.type = json.type;
		var _errorCodes = [];

		this.getErrorCodes = function (value) {
			if (value) {
				_errorCodes = [];
				this.isValid(value);
			}
			return _errorCodes;
		};
		this.isValid = function (value) {
			// isValid checks all datarestrictions
			var validators = this.dataRestrictions.validationRules;
			var hasError = false;
			value = this.removeMask(value);
			for (var i = 0, il = validators.length; i < il; i++) {
				var validator = validators[i];
				if (!validator.validate(value)) {
					hasError = true;
					_errorCodes.push(validator.errorMessageId);
				}
			}
			return !hasError;
		};
		this.applyMask = function (newValue, oldValue) {
			var maskingUtil = new MaskingUtil();
			return maskingUtil.applyMask(this.displayHints.mask, newValue, oldValue);
		};
		this.applyWildcardMask = function (newValue, oldValue) {
			var maskingUtil = new MaskingUtil();
			return maskingUtil.applyMask(this.displayHints.wildcardMask, newValue, oldValue);
		};
		this.removeMask = function (value) {
			var maskingUtil = new MaskingUtil();
			return maskingUtil.removeMask(this.displayHints.mask, value);
		};
	};

	connectsdk.PaymentProductField = PaymentProductField;
	return PaymentProductField;
});