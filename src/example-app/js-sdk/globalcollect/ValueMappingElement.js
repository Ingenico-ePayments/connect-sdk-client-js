define("GCsdk.ValueMappingElement", ["GCsdk.core"], function(GCsdk) {

	var ValueMappingElement = function (json) {
		this.json = json;
		this.displayName = json.displayName;
		this.value = json.value;
	};

	GCsdk.ValueMappingElement = ValueMappingElement;
	return ValueMappingElement;
});