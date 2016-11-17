define("connectsdk.ValidationRuleLuhn", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleLuhn = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
		this.validate = function (value) {
			var luhnArr = [[0,2,4,6,8,1,3,5,7,9],[0,1,2,3,4,5,6,7,8,9]]
				,sum = 0;
				
	   		value.replace(/\D+/g,"").replace(/[\d]/g, function(c, p, o) {
		        sum += luhnArr[ (o.length-p)&1 ][ parseInt(c,10) ];
		    });
		    return (sum%10 === 0) && (sum > 0);
		};
	};

	connectsdk.ValidationRuleLuhn = ValidationRuleLuhn;
	return ValidationRuleLuhn;
});