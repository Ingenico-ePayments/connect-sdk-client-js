define("connectsdk.Session", ["connectsdk.core", "connectsdk.C2SCommunicator", "connectsdk.C2SCommunicatorConfiguration", "connectsdk.IinDetailsResponse", "connectsdk.promise", "connectsdk.C2SPaymentProductContext", "connectsdk.BasicPaymentProducts", "connectsdk.BasicPaymentProductGroups", "connectsdk.PaymentProduct", "connectsdk.PaymentProductGroup", "connectsdk.BasicPaymentItems", "connectsdk.PaymentRequest", "connectsdk.Encryptor"], function (connectsdk, C2SCommunicator, C2SCommunicatorConfiguration, IinDetailsResponse, Promise, C2SPaymentProductContext, BasicPaymentProducts, BasicPaymentProductGroups, PaymentProduct, PaymentProductGroup, BasicPaymentItems, PaymentRequest, Encryptor) {
	var APIVERSION = "client/v1";
	var session = function (sessionDetails, paymentProduct) {

		var _c2SCommunicatorConfiguration = new C2SCommunicatorConfiguration(sessionDetails, APIVERSION),
			_c2sCommunicator = new C2SCommunicator(_c2SCommunicatorConfiguration, paymentProduct),
			_session = this,
			_paymentProductId, _paymentProduct, _paymentRequestPayload, _paymentRequest, _paymentProductGroupId, _paymentProductGroup;
		this.clientApiUrl = _c2SCommunicatorConfiguration.clientApiUrl;
		this.assetUrl = _c2SCommunicatorConfiguration.assetUrl;

		this.getBasicPaymentProducts = function (paymentRequestPayload, paymentProductSpecificInputs) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getBasicPaymentProducts(c2SPaymentProductContext, paymentProductSpecificInputs).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProducts = new BasicPaymentProducts(json);
				promise.resolve(paymentProducts);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getBasicPaymentProductGroups = function (paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getBasicPaymentProductGroups(c2SPaymentProductContext).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProductGroups = new BasicPaymentProductGroups(json);
				promise.resolve(paymentProductGroups);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getBasicPaymentItems = function (paymentRequestPayload, useGroups, paymentProductSpecificInputs) {
			var promise = new Promise();
			// get products & groups
			if (useGroups) {
				_session.getBasicPaymentProducts(paymentRequestPayload, paymentProductSpecificInputs).then(function (products) {
					_session.getBasicPaymentProductGroups(paymentRequestPayload).then(function (groups) {
						var basicPaymentItems = new BasicPaymentItems(products, groups);
						promise.resolve(basicPaymentItems);
					}, function () {
						promise.reject();
					});
				}, function () {
					promise.reject();
				});
			} else {
				_session.getBasicPaymentProducts(paymentRequestPayload, paymentProductSpecificInputs).then(function (products) {
					var basicPaymentItems = new BasicPaymentItems(products, null);
					promise.resolve(basicPaymentItems);
				}, function () {
					promise.reject();
				});
			}
			return promise;
		};

		this.getPaymentProduct = function (paymentProductId, paymentRequestPayload, paymentProductSpecificInputs) {
			var promise = new Promise();
			_paymentProductId = paymentProductId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProduct(paymentProductId, c2SPaymentProductContext, paymentProductSpecificInputs).then(function (response) {
				_paymentProduct = new PaymentProduct(response);
				promise.resolve(_paymentProduct);
			}, function () {
				_paymentProduct = null;
				promise.reject();
			});
			return promise;
		};

		this.getPaymentProductGroup = function (paymentProductGroupId, paymentRequestPayload) {
			var promise = new Promise();
			_paymentProductGroupId = paymentProductGroupId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProductGroup(paymentProductGroupId, c2SPaymentProductContext).then(function (response) {
				_paymentProductGroup = new PaymentProductGroup(response);
				promise.resolve(_paymentProductGroup);
			}, function () {
				_paymentProductGroup = null;
				promise.reject();
			});
			return promise;
		};

		this.getIinDetails = function (partialCreditCardNumber, paymentRequestPayload) {
			partialCreditCardNumber = partialCreditCardNumber.replace(/ /g, '').substring(0, 6);
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			return _c2sCommunicator.getPaymentProductIdByCreditCardNumber(partialCreditCardNumber, c2SPaymentProductContext);
		};

		this.getPublicKey = function () {
			return _c2sCommunicator.getPublicKey();
		};

		this.getPaymentProductPublicKey = function (paymentProductId) {
			return _c2sCommunicator.getPaymentProductPublicKey(paymentProductId);
		};

		this.getPaymentProductNetworks = function (paymentProductId, paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getPaymentProductNetworks(paymentProductId, c2SPaymentProductContext).then(function (response) {
				_paymentRequestPayload = paymentRequestPayload;
				promise.resolve(response);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			return _c2sCommunicator.getPaymentProductDirectory(paymentProductId, currencyCode, countryCode);
		};

		this.convertAmount = function (amount, source, target) {
			return _c2sCommunicator.convertAmount(amount, source, target);
		};

		this.getPaymentRequest = function () {
			if (!_paymentRequest) {
				_paymentRequest = new PaymentRequest(_c2SCommunicatorConfiguration.clientSessionId);
			}
			return _paymentRequest;
		};

		this.getEncryptor = function () {
			var publicKeyResponsePromise = _c2sCommunicator.getPublicKey();
			return new Encryptor(publicKeyResponsePromise);
		};

		this.getThirdPartyPaymentStatus = function (paymentId) {
			var promise = new Promise();
			_c2sCommunicator.getThirdPartyPaymentStatus(paymentId).then(function (response) {
				promise.resolve(response);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getCustomerDetails = function (paymentProductId, paymentRequestPayload) {
			return _c2sCommunicator.getCustomerDetails(paymentProductId, paymentRequestPayload);
		};
	};
	connectsdk.Session = session;
	return session;
});