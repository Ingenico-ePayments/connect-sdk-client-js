define("connectsdk.BasicPaymentProductGroups", ["connectsdk.core", "connectsdk.BasicPaymentProductGroup"], function(connectsdk, BasicPaymentProductGroup) {

	var _parseJson = function (_json, _paymentProductGroups, _accountsOnFile, _paymentProductGroupById, _accountOnFileById) {
		if (_json.paymentProductGroups) {
			for (var i = 0, il = _json.paymentProductGroups.length; i < il; i++) {
				var paymentProductGroup = new BasicPaymentProductGroup(_json.paymentProductGroups[i]);
				_paymentProductGroups.push(paymentProductGroup);
				_paymentProductGroupById[paymentProductGroup.id] = paymentProductGroup;

				if (paymentProductGroup.accountsOnFile) {
					var aofs = paymentProductGroup.accountsOnFile;
					for (var j = 0, jl = aofs.length; j < jl; j++) {
						var aof = aofs[j];
						_accountsOnFile.push(aof);
						_accountOnFileById[aof.id] = aof;
					}
				}
			}
		}
	};

	var BasicPaymentProductGroups = function (json) {
		this.basicPaymentProductGroups = [];
		this.basicPaymentProductGroupById = {};
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.json = json;

		_parseJson(json, this.basicPaymentProductGroups, this.accountsOnFile, this.basicPaymentProductGroupById, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProductGroups = BasicPaymentProductGroups;
	return BasicPaymentProductGroups;
});