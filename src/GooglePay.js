define("connectsdk.GooglePay", ["connectsdk.core", "connectsdk.promise", "connectsdk.Util"], function (connectsdk, Promise, Util) {

    var _util = Util.getInstance();
    var _C2SCommunicator = null;
    var _paymentProductSpecificInputs = null;
    var _context = null;
    var _networks = null;
    var paymentsClient = null;

    // Only base is needed to trigger isReadyToPay
    var _getBaseCardPaymentMethod = function () {
        return {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: _networks
            }
        }
    };

    var _getTokenizationSpecification = function () {
        return {
            type: 'PAYMENT_GATEWAY',
            parameters: {
                'gateway': 'ingenicoglobalcollect',
                'gatewayMerchantId': _paymentProductSpecificInputs.googlePay.gatewayMerchantId
            }
        }
    };

    // To prefetch payment data we need base + tokenizationSpecification
    var _getCardPaymentMethod = function () {
        return Object.assign(
            {},
            _getBaseCardPaymentMethod(),
            {
                tokenizationSpecification: _getTokenizationSpecification()
            }
        );
    };

    var _getTransactionInfo = function () {
        return {
            "totalPriceStatus": "NOT_CURRENTLY_KNOWN",
            "currencyCode": _context.currency
        };
    };

    var _getMerchantInfo = function () {
        return {
            "merchantName": _paymentProductSpecificInputs.googlePay.merchantName
        };
    };

    var _getGooglePaymentDataRequest = function () {
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [_getBaseCardPaymentMethod()]
        };
    };

    var _getGooglePaymentDataRequestForPrefetch = function () {
        // transactionInfo must be set but does not affect cache
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [_getCardPaymentMethod()],
            transactionInfo: _getTransactionInfo(),
            merchantInfo: _getMerchantInfo()
        };
    };

    function _getGooglePaymentsClient() {
        if (paymentsClient === null) {
            var googlePayEnvironment = 'TEST';
            if (_context.environment === 'PROD') {
                googlePayEnvironment = 'PROD';
            }
            if (window.google) {
                paymentsClient = new google.payments.api.PaymentsClient({environment: googlePayEnvironment});
            } else {
                console.error("The Google Pay API script was not loaded https://developers.google.com/pay/api/web/guides/tutorial#js-load");
            }
        }
        return paymentsClient;
    }

    /**
     * Prefetch payment data to improve performance
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
     */
    function prefetchGooglePaymentData() {
        var paymentDataRequest = _getGooglePaymentDataRequestForPrefetch();

        var paymentsClient = _getGooglePaymentsClient();

        // Prefetching is only effective when all information is provided
        if (_paymentProductSpecificInputs.googlePay.gatewayMerchantId &&
            _paymentProductSpecificInputs.googlePay.merchantName) {
            paymentsClient.prefetchPaymentData(paymentDataRequest);
        } else {
            console.warn("Prefetching payment data was not triggered because of missing information. " +
                "gatewayMerchantId: " + _paymentProductSpecificInputs.googlePay.gatewayMerchantId +
                ", merchantName: " + _paymentProductSpecificInputs.googlePay.merchantName)
        }
    }

    var GooglePay = function (C2SCommunicator) {
        _C2SCommunicator = C2SCommunicator;
        this.isGooglePayAvailable = function (context, paymentProductSpecificInputs, networks) {
            _context = context;
            _paymentProductSpecificInputs = paymentProductSpecificInputs;
            _networks = networks;
            var promise = new Promise();
            // This setTimeout is essential to make the following (not fully asynchronous) code work in a promise way in all scenarios. (not needed in happy flow)
            // The SDK has it's only PolyFill for the promise which is not feature complete.
            setTimeout(function () {
                if (_networks && _networks.length > 0) {
                    var paymentsClient = _getGooglePaymentsClient();
                    if (!paymentsClient) {
                        _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                        promise.reject("The Google Pay API script was not loaded https://developers.google.com/pay/api/web/guides/tutorial#js-load");
                    } else {
                        paymentsClient.isReadyToPay(_getGooglePaymentDataRequest())
                            .then(function (response) {
                                promise.resolve(response);

                                prefetchGooglePaymentData();
                            })
                            .catch(function () {
                                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                                promise.reject('failed to run isReadyToPay() with Google Pay API');
                            });
                    }
                } else {
                    _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                    promise.reject('There are no product networks available');
                }
            }, 0);
            return promise;
        };

        this.isMerchantIdProvided = function (paymentProductSpecificInputs) {
            if (paymentProductSpecificInputs.googlePay.merchantId) {
                return paymentProductSpecificInputs.googlePay.merchantId;
            } else {
                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                return false;
            }
        }
    };
    connectsdk.GooglePay = GooglePay;
    return GooglePay;
});
