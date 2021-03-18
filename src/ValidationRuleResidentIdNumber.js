define("connectsdk.ValidationRuleResidentIdNumber", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleResidentIdNumber = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;

        // https://en.wikipedia.org/wiki/Resident_Identity_Card
		var weights = [];
		// storing weights in the reverse order so that we can begin
		// from the 0th position of ID while calculating checksum
		for(var i=18; i > 0; i--) {
			weights.push(Math.pow(2, i-1) % 11);
		}

		this.validate = function (value) {
			if(value.length < 15) {
				return false;
			}

			if(value.length == 15) {
				return !isNaN(value);
			}

			if(value.length < 18 || value.length > 18) {
				return false;
			}

            var sum = 0;
            for(var i = 0; i < value.length-1; i++) {
            	sum += value.charAt(i) * weights[i];
            }

            var checkSum = (12 - (sum % 11)) % 11;
            var csChar = value.charAt(17);

            if(checkSum < 10) {
               return (checkSum == csChar); // check only values
            }

		    return !!csChar && csChar.toUpperCase() === 'X'; // check the type as well
		};
	};

	connectsdk.ValidationRuleResidentIdNumber = ValidationRuleResidentIdNumber;
	return ValidationRuleResidentIdNumber;
});