define("GCsdk.IinDetailsResponse", ["GCsdk.core", "GCsdk.promise"], function(GCsdk, Promise) {

	var IinDetailsResponse = function () {
		this.status = '';
		this.countryCode = '';
		this.paymentProductId = '';
	};
	GCsdk.IinDetailsResponse = IinDetailsResponse;
	return IinDetailsResponse;
});