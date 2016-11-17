define("connectsdk.ValidationRuleExpirationDate", ["connectsdk.core"], function (connectsdk) {

	var _validateDateFormat = function (value) {
		var pattern = /\d{4}|\d{6}$/g;
		return pattern.test(value);
	};

	var ValidationRuleExpirationDate = function (json) {
		this.json = json;
		this.type = json.type,
			this.errorMessageId = json.type;

		// value is mmYY or mmYYYY
		this.validate = function (value) {
			value = value.replace(/[^\d]/g, '');
			if (value.length === 4) {
				split = [value.substring(0, 2), "20" + value.substring(2, 4)];
			} else if (value.length === 6) {
				split = [value.substring(0, 2), value.substring(2, 6)];
			} else {
				return false;
			}
			if (_validateDateFormat(value)) {
				var now = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
				var expirationDate = new Date(split[1], split[0] - 1, 1);
				if (expirationDate.getMonth() !== Number(split[0] - 1) || expirationDate.getFullYear() !== Number(split[1])) {
					return false;
				}
				return expirationDate >= now; // the expiration month could be THIS month but that is still valid!
			}
			return false;
		};
	};

	connectsdk.ValidationRuleExpirationDate = ValidationRuleExpirationDate;
	return ValidationRuleExpirationDate;
});