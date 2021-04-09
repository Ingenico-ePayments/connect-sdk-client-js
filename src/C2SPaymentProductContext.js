define("connectsdk.C2SPaymentProductContext", ["connectsdk.core"], function(connectsdk) {

    var C2SPaymentProductContext = function (payload) {
        this.totalAmount = typeof payload.totalAmount !== 'undefined' ? payload.totalAmount : '';
        this.countryCode = payload.countryCode;
        this.isRecurring = typeof payload.isRecurring !== 'undefined' ? payload.isRecurring : '';
        this.currency = payload.currency;

        if (typeof payload.locale !== 'undefined') {
            this.locale = payload.locale;
        }

        this.isInstallments = payload.isInstallments || '';

        if (typeof payload.accountOnFileId !== 'undefined') {
            this.accountOnFileId = parseInt(payload.accountOnFileId);
        }
    };

  connectsdk.C2SPaymentProductContext = C2SPaymentProductContext;
  return C2SPaymentProductContext;
});
