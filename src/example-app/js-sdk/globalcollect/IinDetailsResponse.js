define("GCsdk.IinDetailsResponse", ["GCsdk.core", "GCsdk.promise"], function(GCsdk, Promise) {

	var IinDetailsResponse = function () {
		this.status = '';
		this.countryCode = '';
		this.paymentProductId = '';
		this.isAllowedInContext = '';
		this.coBrands = [];
	};
	GCsdk.IinDetailsResponse = IinDetailsResponse;
	return IinDetailsResponse;
});