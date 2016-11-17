define("connectsdk.PaymentRequest", ["connectsdk.core"], function(connectsdk) {
  var PaymentRequest = function(clientSessionID) {
    var _clientSessionID = clientSessionID;
    var _fieldValues = {};
    var _paymentProduct = null;
    var _accountOnFile = null;
    var _tokenize = false;

    this.isValid = function() {
      var errors = this.getErrorMessageIds();
      // besides checking the fields for errors check if all mandatory fields are present as well
      var paymentProduct = this.getPaymentProduct();
      if (!paymentProduct) {
        return false;
      }
      var allRequiredFieldsPresent = true;
      for (var i = 0; i < paymentProduct.paymentProductFields.length; i++) {
        var field = paymentProduct.paymentProductFields[i];
        if (field.dataRestrictions.isRequired) {
          // is this field present in the request?
          var storedValue = this.getValue(field.id);
          if (!storedValue && !this.getAccountOnFile()) {
              // if we have an acoount on file the account on file could have the field, so we can ignore it
            allRequiredFieldsPresent = false;
          }
        }
      }
      return errors.length === 0 && allRequiredFieldsPresent;
    };
    this.setValue = function(paymentProductFieldId, value) {
      _fieldValues[paymentProductFieldId] = value;
    };
    this.setTokenize = function(tokenize) {
      _tokenize = tokenize;
    };
    this.getTokenize = function() {
      return _tokenize;
    };
    this.getErrorMessageIds = function() {
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
    this.getValues = function() {
      return _fieldValues;
    };
    this.getMaskedValue = function(paymentProductFieldId) {
      var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
      var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
      return maskedString.formattedValue();
    };
    this.getMaskedValues = function() {
      var fields = _fieldValues;
      var result = [];
      for (var paymentProductFieldId in fields) {
        var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
        var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
        result[paymentProductFieldId] = maskedString.formattedValue;
      }
      return result;
    };
    this.getUnmaskedValues = function() {
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
    this.setPaymentProduct = function(paymentProduct) {
      if (paymentProduct.type === "group") {
        return;
      }
      _paymentProduct = paymentProduct;
    };
    this.getPaymentProduct = function() {
      return _paymentProduct;
    };
    this.setAccountOnFile = function(accountOnFile) {
      for (var i = 0, il = accountOnFile.attributes.length; i < il; i++) {
        var attribute = accountOnFile.attributes[i];
        delete _fieldValues[attribute.key];
      }
      _accountOnFile = accountOnFile;
    };
    this.getAccountOnFile = function() {
      return _accountOnFile;
    };
    this.getClientSessionID = function() {
		    return clientSessionID;
    };
  };
  connectsdk.PaymentRequest = PaymentRequest;
  return PaymentRequest;
});