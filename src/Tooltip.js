define("connectsdk.Tooltip", ["connectsdk.core"], function(connectsdk) {

	var Tooltip = function (json) {
		this.json = json;
		this.image = json.image;
		this.label = json.label;
	};

	connectsdk.Tooltip = Tooltip;
	return Tooltip;
});