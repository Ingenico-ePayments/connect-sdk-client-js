define("connectsdk.C2SPaymentProductContext", ["connectsdk.core"], function(connectsdk) {

    var C2SPaymentProductContext = function (payload) {
        this.totalAmount = (payload.totalAmount === undefined) ? '' : payload.totalAmount;
        this.countryCode = payload.countryCode;
        this.isRecurring = (payload.isRecurring === undefined) ? '' : payload.isRecurring;
        this.currency = payload.currency;
        if (payload.locale !== undefined){
            this.locale = payload.locale
        }
    };

  connectsdk.C2SPaymentProductContext = C2SPaymentProductContext;
  return C2SPaymentProductContext;
});