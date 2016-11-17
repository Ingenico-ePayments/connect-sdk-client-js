define("connectsdk.BasicPaymentProductGroup", ["connectsdk.core", "connectsdk.AccountOnFile", "connectsdk.PaymentProductDisplayHints"], function(connectsdk, AccountOnFile, PaymentProductDisplayHints) {

	var _parseJSON = function (_json, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
	};

	var BasicPaymentProductGroup = function (json) {
		this.json = json;
		this.json.type = "group";
		this.id = json.id;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		_parseJSON(json, this.accountsOnFile, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProductGroup = BasicPaymentProductGroup;
	return BasicPaymentProductGroup;
});