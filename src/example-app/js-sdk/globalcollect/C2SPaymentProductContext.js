define("GCsdk.C2SPaymentProductContext", ["GCsdk.core"], function(GCsdk) {

  var C2SPaymentProductContext = function (payload) {
	this.totalAmount = payload.totalAmount;
	this.countryCode = payload.countryCode;
	this.isRecurring = payload.isRecurring;
	this.currency = payload.currency;
	this.locale = payload.locale;
  };

  GCsdk.C2SPaymentProductContext = C2SPaymentProductContext;
  return C2SPaymentProductContext;
});