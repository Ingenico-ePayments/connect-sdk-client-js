///<amd-module name="connectsdk.BasicPaymentProductGroups"/>

import AccountOnFile = require("./AccountOnFile");
import { PaymentProductGroupsJSON } from "./apimodel";
import BasicPaymentProductGroup = require("./BasicPaymentProductGroup");

function _parseJson(
  _json: PaymentProductGroupsJSON,
  _paymentProductGroups: BasicPaymentProductGroup[],
  _accountsOnFile: AccountOnFile[],
  _paymentProductGroupById: { [id: string]: BasicPaymentProductGroup | undefined },
  _accountOnFileById: { [id: number]: AccountOnFile | undefined }
): void {
  if (_json.paymentProductGroups) {
    for (const productGroup of _json.paymentProductGroups) {
      const paymentProductGroup = new BasicPaymentProductGroup(productGroup);
      _paymentProductGroups.push(paymentProductGroup);
      _paymentProductGroupById[paymentProductGroup.id] = paymentProductGroup;

      if (paymentProductGroup.accountsOnFile) {
        for (const aof of paymentProductGroup.accountsOnFile) {
          _accountsOnFile.push(aof);
          _accountOnFileById[aof.id] = aof;
        }
      }
    }
  }
}

class BasicPaymentProductGroups {
  readonly basicPaymentProductGroups: BasicPaymentProductGroup[];
  readonly basicPaymentProductGroupById: { [id: string]: BasicPaymentProductGroup | undefined };
  readonly accountsOnFile: AccountOnFile[];
  readonly accountOnFileById: { [id: number]: AccountOnFile | undefined };

  constructor(readonly json: PaymentProductGroupsJSON) {
    this.basicPaymentProductGroups = [];
    this.basicPaymentProductGroupById = {};
    this.accountsOnFile = [];
    this.accountOnFileById = {};

    _parseJson(json, this.basicPaymentProductGroups, this.accountsOnFile, this.basicPaymentProductGroupById, this.accountOnFileById);
  }
}

export = BasicPaymentProductGroups;
