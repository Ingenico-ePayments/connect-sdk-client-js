define("connectsdk.ValidationRuleExpirationDate", ["connectsdk.core"], function (connectsdk) {

	var _validateDateFormat = function (value) {
		// value is mmYY or mmYYYY
		var pattern = /\d{4}|\d{6}$/g;
		return pattern.test(value);
	};

	var ValidationRuleExpirationDate = function (json) {
		this.json = json;
		this.type = json.type;
		this.errorMessageId = json.type;

		this.validate = function (value) {

			value = value.replace(/[^\d]/g, '');
			if (!_validateDateFormat(value)) {
				return false;
			}

			var split;
			if (value.length === 4) {
				split = [value.substring(0, 2), "20" + value.substring(2, 4)];
			} else if (value.length === 6) {
				split = [value.substring(0, 2), value.substring(2, 6)];
			} else {
				return false;
			}

			// The month is zero-based, so subtract one.
			var expirationMonth = split[0] - 1;
			var expirationYear = split[1];
			var expirationDate = new Date(expirationYear, expirationMonth, 1);

			// Compare the input with the parsed date, to check if the date rolled over.
			if (expirationDate.getMonth() !== Number(expirationMonth) || expirationDate.getFullYear() !== Number(expirationYear)) {
				return false;
			}

			// For comparison, set the current year & month and the maximum allowed expiration date.
			var nowWithDay = new Date();
			var now = new Date(nowWithDay.getFullYear(), nowWithDay.getMonth(), 1);
			var maxExpirationDate = new Date(nowWithDay.getFullYear() + 25, 11, 1);

			// The card is still valid if it expires this month.
			return expirationDate >= now && expirationDate <= maxExpirationDate;
		};
	};

	connectsdk.ValidationRuleExpirationDate = ValidationRuleExpirationDate;
	return ValidationRuleExpirationDate;
});
