define("connectsdk.IinDetailsResponse", ["connectsdk.core", "connectsdk.promise"], function(connectsdk, Promise) {

	var IinDetailsResponse = function () {
		this.status = '';
		this.countryCode = '';
		this.paymentProductId = '';
		this.isAllowedInContext = '';
		this.coBrands = [];
	};
	connectsdk.IinDetailsResponse = IinDetailsResponse;
	return IinDetailsResponse;
});