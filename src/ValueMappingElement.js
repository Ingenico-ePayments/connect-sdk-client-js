define("connectsdk.ValueMappingElement", ["connectsdk.core"], function(connectsdk) {

	var ValueMappingElement = function (json) {
		this.json = json;
		this.displayName = json.displayName;
		this.value = json.value;
	};

	connectsdk.ValueMappingElement = ValueMappingElement;
	return ValueMappingElement;
});