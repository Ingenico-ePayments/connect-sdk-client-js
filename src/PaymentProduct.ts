///<amd-module name="connectsdk.PaymentProduct"/>

import { PaymentProductJSON } from "./apimodel";
import BasicPaymentProduct = require("./BasicPaymentProduct");
import PaymentProductField = require("./PaymentProductField");

function _parseJSON(_json: PaymentProductJSON, _paymentProductFields: PaymentProductField[], _paymentProductFieldById: { [id: string]: PaymentProductField | undefined }): void {
  if (_json.fields) {
    for (const field of _json.fields) {
      const paymentProductField = new PaymentProductField(field);
      _paymentProductFields.push(paymentProductField);
      _paymentProductFieldById[paymentProductField.id] = paymentProductField;
    }
  }
}

class PaymentProduct extends BasicPaymentProduct {
  readonly paymentProductFields: PaymentProductField[];
  readonly paymentProductFieldById: { [id: string]: PaymentProductField | undefined };

  constructor(readonly json: PaymentProductJSON) {
    super(json);
    this.paymentProductFields = [];
    this.paymentProductFieldById = {};

    _parseJSON(json, this.paymentProductFields, this.paymentProductFieldById);
  }
}

export = PaymentProduct;
