define("connectsdk.MaskedString", ["connectsdk.core"], function(connectsdk) {

	var MaskedString = function(formattedValue, cursorIndex) {

		this.formattedValue = formattedValue;
		this.cursorIndex = cursorIndex;
	};

	connectsdk.MaskedString = MaskedString;
	return MaskedString;
});