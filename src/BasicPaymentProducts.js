define("connectsdk.BasicPaymentProducts", ["connectsdk.core", "connectsdk.BasicPaymentProduct"], function(connectsdk, BasicPaymentProduct) {

	var _parseJson = function (_json, _paymentProducts, _accountsOnFile, _paymentProductById, _accountOnFileById, _paymentProductByAccountOnFileId) {
		if (_json.paymentProducts) {
			for (var i = 0, il = _json.paymentProducts.length; i < il; i++) {
				var paymentProduct = new BasicPaymentProduct(_json.paymentProducts[i]);
				_paymentProducts.push(paymentProduct);
				_paymentProductById[paymentProduct.id] = paymentProduct;

				if (paymentProduct.accountsOnFile) {
					var aofs = paymentProduct.accountsOnFile;
					for (var j = 0, jl = aofs.length; j < jl; j++) {
						var aof = aofs[j];
						_accountsOnFile.push(aof);
						_accountOnFileById[aof.id] = aof;
						_paymentProductByAccountOnFileId[aof.id] = paymentProduct;
					}
				}
			}
		}
	};

	var BasicPaymentProducts = function (json) {
		this.basicPaymentProducts = [];
		this.basicPaymentProductById = {};
		this.basicPaymentProductByAccountOnFileId = {};
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.json = json;

		_parseJson(json, this.basicPaymentProducts, this.accountsOnFile, this.basicPaymentProductById, this.accountOnFileById, this.basicPaymentProductByAccountOnFileId);
	};

	connectsdk.BasicPaymentProducts = BasicPaymentProducts;
	return BasicPaymentProducts;
});