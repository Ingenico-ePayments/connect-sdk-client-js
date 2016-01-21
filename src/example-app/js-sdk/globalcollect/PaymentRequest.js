define("GCsdk.PaymentRequest", ["GCsdk.core"], function(GCsdk) {
	var PaymentRequest = function (clientSessionID) {
	    var _clientSessionID = clientSessionID;
		var _fieldValues = {};
		var _paymentProduct = null;
		var _accountOnFile  = null;
		var _tokenize = false;

		this.isValid = function () {
			var errors = this.getErrorMessageIds();
			return errors.length === 0;
		};
		this.setValue = function(paymentProductFieldId, value) {
			_fieldValues[paymentProductFieldId] = value;
		};
		this.setTokenize = function (tokenize) {
			_tokenize = tokenize;
		};
		this.getTokenize = function () {
			return _tokenize;
		};
		this.getErrorMessageIds = function () {
			var errors = [];
			for (key in _fieldValues) {
				var paymentProductField = _paymentProduct.paymentProductFieldById[key];
				if (paymentProductField) {
					errors = errors.concat(paymentProductField.getErrorCodes(_fieldValues[key]));
				}
			}
			return errors;
		};
		this.getValue = function(paymentProductFieldId) {
			return _fieldValues[paymentProductFieldId];
		};
		this.getValues = function () {
			return _fieldValues;
		};
		this.getMaskedValue = function (paymentProductFieldId) {
			var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
			var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
			return maskedString.formattedValue();
		};
		this.getMaskedValues = function () {
			var fields = _fieldValues;
			var result = [];
			for (var paymentProductFieldId in fields) {
				var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
				var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
				result[paymentProductFieldId] = maskedString.formattedValue;
			}
			return result;
		};
		this.getUnmaskedValues = function () {
			var fields = _fieldValues;
			var result = [];
			for (var paymentProductFieldId in fields) {
				var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
				if (paymentProductField) {
					var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
					var formattedValue = maskedString.formattedValue;
					result[paymentProductFieldId] = paymentProductField.removeMask(formattedValue);
				}
			}
			return result;
		};
		this.setPaymentProduct = function (paymentProduct) {
			_paymentProduct = paymentProduct;
		};
		this.getPaymentProduct = function () {
			return _paymentProduct;
		};
		this.setAccountOnFile = function(accountOnFile) {
			for (var i = 0, il = accountOnFile.attributes.length; i < il; i++) {
				var attribute = accountOnFile.attributes[i];
				delete _fieldValues[attribute.key];
			}
			_accountOnFile = accountOnFile;
		};
		this.getAccountOnFile = function () {
			return _accountOnFile;
		};
		this.getClientSessionID = function() {
		    return clientSessionID;
        };
	};
	GCsdk.PaymentRequest = PaymentRequest;
	return PaymentRequest;
});