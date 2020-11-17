define("connectsdk.BasicPaymentProduct", ["connectsdk.core", "connectsdk.AccountOnFile", "connectsdk.PaymentProductDisplayHints", "connectsdk.PaymentProduct302SpecificData", "connectsdk.PaymentProduct320SpecificData", "connectsdk.PaymentProduct863SpecificData"], function(connectsdk, AccountOnFile, PaymentProductDisplayHints, PaymentProduct302SpecificData, PaymentProduct320SpecificData, PaymentProduct863SpecificData) {

	var _parseJSON = function (_json, _paymentProduct, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
		if (_json.paymentProduct302SpecificData) {
			_paymentProduct.paymentProduct302SpecificData = new PaymentProduct302SpecificData(_json.paymentProduct302SpecificData);
		}
		if (_json.paymentProduct320SpecificData) {
			_paymentProduct.paymentProduct320SpecificData = new PaymentProduct320SpecificData(_json.paymentProduct320SpecificData);
		}
		if (_json.paymentProduct863SpecificData) {
			_paymentProduct.paymentProduct863SpecificData = new PaymentProduct863SpecificData(_json.paymentProduct863SpecificData);
		}
	};

	var BasicPaymentProduct = function (json) {
		this.json = json;
		this.json.type = "product";
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.allowsRecurring = json.allowsRecurring;
		this.allowsTokenization = json.allowsTokenization;
		this.autoTokenized = json.autoTokenized;
		this.allowsInstallments = json.allowsInstallments;
		this.acquirerCountry = json.acquirerCountry;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.id = json.id;
		this.maxAmount = json.maxAmount;
		this.minAmount = json.minAmount;
		this.paymentMethod = json.paymentMethod;
		this.mobileIntegrationLevel = json.mobileIntegrationLevel;
		this.usesRedirectionTo3rdParty = json.usesRedirectionTo3rdParty;
		this.paymentProductGroup = json.paymentProductGroup;

		_parseJSON(json, this, this.accountsOnFile, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProduct = BasicPaymentProduct;
	return BasicPaymentProduct;
});