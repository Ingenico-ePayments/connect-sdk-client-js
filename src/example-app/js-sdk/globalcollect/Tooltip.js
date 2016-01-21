define("GCsdk.Tooltip", ["GCsdk.core"], function(GCsdk) {

	var Tooltip = function (json) {
		this.json = json;
		this.image = json.image;
		this.label = json.label;
	};

	GCsdk.Tooltip = Tooltip;
	return Tooltip;
});