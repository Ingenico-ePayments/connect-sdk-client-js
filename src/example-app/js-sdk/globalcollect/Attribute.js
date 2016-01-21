define("GCsdk.Attribute", ["GCsdk.core"], function(GCsdk) {

	var Attribute = function (json) {
		this.json = json;
		this.key = json.key;
		this.value = json.value;
		this.status = json.status;
		this.mustWriteReason = json.mustWriteReason;
	};

	GCsdk.Attribute = Attribute;
	return Attribute;
});