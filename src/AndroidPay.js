define("connectsdk.AndroidPay", ["connectsdk.core", "connectsdk.promise", "connectsdk.Util"], function (connectsdk, Promise, Util) {

    var _util = Util.getInstance();
    var _C2SCommunicator = null;
    var _paymentProductSpecificInputs = null;
    var _context = null;

    var setupRequestMethodData = function (networks, publicKey) {
        var androidPayEnvironment = 'TEST';
        if (_context.environment === 'PROD') {
            androidPayEnvironment = 'PROD';
        }
        var methodData = [{
            supportedMethods: ['https://android.com/pay'],
            data: {
                merchantId: _paymentProductSpecificInputs.androidPay.merchantId,
                environment: androidPayEnvironment,
                allowedCardNetworks: networks,
                paymentMethodTokenizationParameters: {
                    tokenizationType: 'NETWORK_TOKEN',
                    parameters: {
                        'publicKey': publicKey
                    }
                }
            }
        }];
        return methodData;
    }

    var setupRequestDetails = function () {
        var totalAmount = (_context.totalAmount / 100).toFixed(2);

        var details = {
            total: {
                label: 'Total',
                amount: {
                    currency: _context.currency,
                    value: totalAmount
                }
            }
        };
        return details;
    }

    var setupRequestOptions = function () {
        var options = {
            requestShipping: false,
            requestPayerEmail: false,
            requestPayerPhone: false,
            requestPayerName: false
        };
        return options;
    }

    var _doCanMakePayment = function (jsonNetworks, jsonPublicKey) {
        var promise = new Promise();

        var methodData = setupRequestMethodData(jsonNetworks.networks, jsonPublicKey.publicKey);
        var details = setupRequestDetails();
        var options = setupRequestOptions();
        var request = new PaymentRequest(methodData, details, options);
        setTimeout(function () {
            // When the PRAPI is available, it does not mean the canMakePayment() method is also implemented.
            if (request.canMakePayment) {
                request.canMakePayment().then(function (result) {
                    if (result) {
                        promise.resolve(true);
                    } else {
                        promise.resolve(false);
                    }
                })['catch'](function (error) { // we use ['catch'] notation intead of .catch because of IE8 compatibility
                    promise.reject(error);
                });
            } else {
                promise.resolve(true);
            }
        });
        return promise;
    }

    var _checkPaymentProductPublicKey = function () {
        var promise = new Promise();
        _C2SCommunicator.getPaymentProductPublicKey(_util.androidPayPaymentProductId).then(function (jsonPublicKey) {
            promise.resolve(jsonPublicKey);
        }, function () {
            promise.reject();
        });
        return promise;
    }

    var _checkPaymentProductNetworks = function () {
        var promise = new Promise();
        _C2SCommunicator.getPaymentProductNetworks(_util.androidPayPaymentProductId, _context).then(function (jsonNetworks) {
            if (jsonNetworks.networks && jsonNetworks.networks.length > 0) {
                promise.resolve(jsonNetworks);
            } else {
                promise.reject();
            }
        }, function () {
            promise.reject();
        });
        return promise;
    }

    var _isPaymentRequestAPIAvailable = function () {
        return window && window.PaymentRequest;
    }

    var AndroidPay = function (C2SCommunicator) {
        _C2SCommunicator = C2SCommunicator;
        this.isAndroidPayAvailable = function (context, paymentProductSpecificInputs) {
            _context = context;
            _paymentProductSpecificInputs = paymentProductSpecificInputs;
            var promise = new Promise();
            setTimeout(function () {
                if (_isPaymentRequestAPIAvailable()) {
                    _checkPaymentProductNetworks().then(function (jsonNetworks) {
                        _checkPaymentProductPublicKey().then(function (jsonPublicKey) {
                            _doCanMakePayment(jsonNetworks, jsonPublicKey).then(function (isAndroidPayAvailable) {
                                if (!isAndroidPayAvailable) {
                                    _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.androidPayPaymentProductId);
                                }
                                promise.resolve(isAndroidPayAvailable);
                            }, function () {
                                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.androidPayPaymentProductId);
                                promise.reject('failed to run canMakePayment() check with the payment request API');
                            });
                        }, function () {
                            _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.androidPayPaymentProductId);
                            promise.reject('failed to retrieve payment product publickey');
                        });
                    }, function () {
                        _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.androidPayPaymentProductId);
                        promise.reject('failed to retrieve paymentproduct networks');
                    });
                } else {
                    _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.androidPayPaymentProductId);
                    promise.reject('Payment Request API is not available');
                }
            });
            return promise;
        }

        this.isMerchantIdProvided = function (paymentProductSpecificInputs) {
            if (paymentProductSpecificInputs.androidPay.merchantId) {
                return paymentProductSpecificInputs.androidPay.merchantId;
            } else {
                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.androidPayPaymentProductId);
                return false;
            }
        }
    };
    connectsdk.AndroidPay = AndroidPay;
    return AndroidPay;
});