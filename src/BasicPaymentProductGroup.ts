///<amd-module name="connectsdk.BasicPaymentProductGroup"/>

import AccountOnFile = require("./AccountOnFile");
import { BasicPaymentProductGroupJSON } from "./apimodel";
import PaymentProductDisplayHints = require("./PaymentProductDisplayHints");

function _parseJSON(_json: BasicPaymentProductGroupJSON, _accountsOnFile: AccountOnFile[], _accountOnFileById: { [id: number]: AccountOnFile | undefined }): void {
  if (_json.accountsOnFile) {
    for (const aof of _json.accountsOnFile) {
      const accountOnFile = new AccountOnFile(aof);
      _accountsOnFile.push(accountOnFile);
      _accountOnFileById[accountOnFile.id] = accountOnFile;
    }
  }
}

class BasicPaymentProductGroup {
  readonly id: string;
  readonly acquirerCountry?: string;
  readonly allowsInstallments: boolean;
  readonly displayHints: PaymentProductDisplayHints;
  readonly accountsOnFile: AccountOnFile[];
  readonly accountOnFileById: { [id: number]: AccountOnFile | undefined };
  readonly type = "group";

  constructor(readonly json: BasicPaymentProductGroupJSON) {
    this.json.type = "group";
    this.id = json.id;
    //this.acquirerCountry = json.acquirerCountry;
    this.allowsInstallments = json.allowsInstallments;
    this.displayHints = new PaymentProductDisplayHints(json.displayHints);
    this.accountsOnFile = [];
    this.accountOnFileById = {};

    _parseJSON(json, this.accountsOnFile, this.accountOnFileById);
  }

  copy(): BasicPaymentProductGroup {
    const json = JSON.parse(JSON.stringify(this.json)) as BasicPaymentProductGroupJSON;
    return new BasicPaymentProductGroup(json);
  }
}

export = BasicPaymentProductGroup;
