///<amd-module name="connectsdk.PaymentProductGroup"/>

import { PaymentProductGroupJSON } from "./apimodel";
import BasicPaymentProductGroup = require("./BasicPaymentProductGroup");
import PaymentProductField = require("./PaymentProductField");

function _parseJSON(
  _json: PaymentProductGroupJSON,
  _paymentProductFields: PaymentProductField[],
  _paymentProductFieldById: { [id: string]: PaymentProductField | undefined }
): void {
  if (_json.fields) {
    for (const field of _json.fields) {
      const paymentProductField = new PaymentProductField(field);
      _paymentProductFields.push(paymentProductField);
      _paymentProductFieldById[paymentProductField.id] = paymentProductField;
    }
  }
}

class PaymentProductGroup extends BasicPaymentProductGroup {
  readonly paymentProductFields: PaymentProductField[];
  readonly paymentProductFieldById: { [id: string]: PaymentProductField | undefined };

  constructor(readonly json: PaymentProductGroupJSON) {
    super(json);
    this.paymentProductFields = [];
    this.paymentProductFieldById = {};

    _parseJSON(json, this.paymentProductFields, this.paymentProductFieldById);
  }
}

export = PaymentProductGroup;
