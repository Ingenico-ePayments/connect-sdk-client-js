define("connectsdk.Attribute", ["connectsdk.core"], function(connectsdk) {

	var Attribute = function (json) {
		this.json = json;
		this.key = json.key;
		this.value = json.value;
		this.status = json.status;
		this.mustWriteReason = json.mustWriteReason;
	};

	connectsdk.Attribute = Attribute;
	return Attribute;
});