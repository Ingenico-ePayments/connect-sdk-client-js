define("connectsdk.BasicPaymentProduct", ["connectsdk.core", "connectsdk.AccountOnFile", "connectsdk.PaymentProductDisplayHints"], function(connectsdk, AccountOnFile, PaymentProductDisplayHints) {

	var _parseJSON = function (_json, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
	};

	var BasicPaymentProduct = function (json) {
		this.json = json;
		this.json.type = "product";
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.allowsRecurring = json.allowsRecurring;
		this.allowsTokenization = json.allowsTokenization;
		this.autoTokenized  = json.autoTokenized ;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.id = json.id;
		this.maxAmount = json.maxAmount;
		this.minAmount = json.minAmount;
		this.paymentMethod = json.paymentMethod;
		this.mobileIntegrationLevel = json.mobileIntegrationLevel;
		this.usesRedirectionTo3rdParty = json.usesRedirectionTo3rdParty;
		this.paymentProductGroup = json.paymentProductGroup;

		_parseJSON(json, this.accountsOnFile, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProduct = BasicPaymentProduct;
	return BasicPaymentProduct;
});