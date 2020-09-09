define("connectsdk.ApplePay", ["connectsdk.core", "connectsdk.promise", "connectsdk.Util"], function (connectsdk, Promise, Util) {

    var _util = Util.getInstance();

    var ApplePay = function () {
        this.isApplePayAvailable = function () {
            var applePayIsAvailable = window.ApplePaySession && window.ApplePaySession.canMakePayments();
            if (!applePayIsAvailable) {
                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.applePayPaymentProductId);
            }
            return applePayIsAvailable;
        };
        this.initPayment = function (context, C2SCommunicator) {
            var promise = new Promise();
            var _context = context;
            var _C2SCommunicator = C2SCommunicator;

            var payment = {
                currencyCode: _context.currency,
                countryCode: _context.countryCode,
                total: {
                    label: _context.displayName,
                    amount: _context.totalAmount / 100,
                },
                supportedNetworks: _context.networks,
                merchantCapabilities: ['supports3DS'],
            };

            var applePaySession = new ApplePaySession(1, payment);
            applePaySession.begin();

            applePaySession.onvalidatemerchant = function (event) {
                _context.validationURL = event.validationURL;
                _context.domainName = window.location.hostname;
                _C2SCommunicator.createPaymentProductSession('302', _context).then(function (merchantSession) {
                    try {
                        applePaySession.completeMerchantValidation(JSON.parse(merchantSession.paymentProductSession302SpecificOutput.sessionObject));
                    } catch {
                        promise.reject({ message: 'Error completing merchant validation' });
                        applePaySession.abort();
                    }
                }, function () {
                    promise.reject({ message: 'Error completing merchant validation' });
                    applePaySession.abort();
                })
            };

            applePaySession.onpaymentauthorized = function (event) {
                if (!event.payment.token) {
                    status = ApplePaySession.STATUS_FAILURE;
                    promise.reject({ message: 'Error payment authorization' });
                    applePaySession.completePayment(status);
                } else {
                    status = ApplePaySession.STATUS_SUCCESS;
                    promise.resolve({ message: 'Payment authorized', data: event.payment.token });
                    applePaySession.completePayment(status);
                }
            };
            return promise;
        };
    }

    connectsdk.ApplePay = ApplePay;
    return ApplePay;
});