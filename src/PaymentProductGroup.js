define("connectsdk.PaymentProductGroup", ["connectsdk.core", "connectsdk.BasicPaymentProduct", "connectsdk.PaymentProductField"], function(connectsdk, BasicPaymentProduct, PaymentProductField) {

	var _parseJSON = function (_json, _paymentProductFields, _paymentProductFieldById) {
		if (_json.fields) {
			for (var i = 0, il = _json.fields.length; i < il; i++) {
				var paymentProductField = new PaymentProductField(_json.fields[i]);
				_paymentProductFields.push(paymentProductField);
				_paymentProductFieldById[paymentProductField.id] = paymentProductField;
			}
		}
	};

	var PaymentProductGroup = function (json) {
		var basicPaymentProduct = new BasicPaymentProduct(json);
		basicPaymentProduct.json = json;
		basicPaymentProduct.json.type = "group";
		basicPaymentProduct.paymentProductFields = [];
		basicPaymentProduct.paymentProductFieldById = {};

		_parseJSON(basicPaymentProduct.json, basicPaymentProduct.paymentProductFields, basicPaymentProduct.paymentProductFieldById);

		return basicPaymentProduct;
	};

	connectsdk.PaymentProductGroup = PaymentProductGroup;
	return PaymentProductGroup;
});