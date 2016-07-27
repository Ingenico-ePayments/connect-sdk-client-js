define("GCsdk.Session", ["GCsdk.core", "GCsdk.C2SCommunicator", "GCsdk.C2SCommunicatorConfiguration", "GCsdk.IinDetailsResponse", "GCsdk.promise", "GCsdk.C2SPaymentProductContext", "GCsdk.PaymentProducts", "GCsdk.PaymentProduct", "GCsdk.PaymentRequest", "GCsdk.Encryptor"], function(GCsdk, C2SCommunicator, C2SCommunicatorConfiguration, IinDetailsResponse, Promise, C2SPaymentProductContext, PaymentProducts, PaymentProduct, PaymentRequest, Encryptor) {

	var session = function (sessionDetails, paymentProduct) {

		var _c2SCommunicatorConfiguration = new C2SCommunicatorConfiguration(sessionDetails)
			,_c2sCommunicator = new C2SCommunicator(_c2SCommunicatorConfiguration, paymentProduct)
			,_paymentProductId, _paymentProduct, _paymentRequestPayload, _paymentRequest;

		this.apiBaseUrl = _c2SCommunicatorConfiguration.apiBaseUrl;
		this.assetsBaseUrl = _c2SCommunicatorConfiguration.assetsBaseUrl;

		this.getPaymentProducts = function(paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getPaymentProducts(c2SPaymentProductContext).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProducts = new PaymentProducts(json);
				promise.resolve(paymentProducts);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getPaymentProduct = function(paymentProductId, paymentRequestPayload) {
			var promise = new Promise();
			_paymentProductId = paymentProductId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProduct(paymentProductId, c2SPaymentProductContext).then(function (response) {
				_paymentProduct = new PaymentProduct(response);
				promise.resolve(_paymentProduct);
			}, function () {
				_paymentProduct = null;
				promise.reject();
			});
			return promise;
		};

		this.getIinDetails = function (partialCreditCardNumber, paymentRequestPayload) {
			partialCreditCardNumber = partialCreditCardNumber.replace(/ /g, '').substring(0,6);
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			return _c2sCommunicator.getPaymentProductIdByCreditCardNumber(partialCreditCardNumber, c2SPaymentProductContext);
		};

		this.getPublicKey = function () {
			return _c2sCommunicator.getPublicKey();
		};

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			return _c2sCommunicator.getPaymentProductDirectory(paymentProductId, currencyCode, countryCode);
		};

		this.convertAmount = function (amount, source, target) {
			return _c2sCommunicator.convertAmount(amount, source, target);
		};

		this.getPaymentRequest = function () {
			if (!_paymentRequest) {
				_paymentRequest = new PaymentRequest(sessionDetails.clientSessionID);

			}
			return _paymentRequest;
		};

		this.getEncryptor = function () {
			var publicKeyResponsePromise = _c2sCommunicator.getPublicKey();
			return new Encryptor(publicKeyResponsePromise);
		};
	};
	GCsdk.Session = session;
	return session;
});