define("GCsdk.MaskedString", ["GCsdk.core"], function(GCsdk) {

	var MaskedString = function(formattedValue, cursorIndex) {

		this.formattedValue = formattedValue;
		this.cursorIndex = cursorIndex;
	};

	GCsdk.MaskedString = MaskedString;
	return MaskedString;
});