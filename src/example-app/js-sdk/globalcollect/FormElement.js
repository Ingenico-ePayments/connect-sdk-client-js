define("GCsdk.FormElement", ["GCsdk.core", "GCsdk.ValueMappingElement"], function(GCsdk, ValueMappingElement) {

	var FormElement = function (json) {

		var _parseJSON = function (_json, _valueMapping) {
			if (_json.valueMapping) {
				for (var i = 0, l = _json.valueMapping.length; i < l; i++) {
					_valueMapping.push(new ValueMappingElement(_json.valueMapping[i]));
				}
			}
		};

		this.json = json;
		this.type = json.type;
		this.valueMapping = [];
		
		_parseJSON(json, this.valueMapping);
	};

	GCsdk.FormElement = FormElement;
	return FormElement;
});