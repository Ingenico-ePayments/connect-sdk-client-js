///<amd-module name="connectsdk.BasicPaymentProduct"/>

import AccountOnFile = require("./AccountOnFile");
import PaymentProduct302SpecificData = require("./PaymentProduct302SpecificData");
import PaymentProduct320SpecificData = require("./PaymentProduct320SpecificData");
import PaymentProduct863SpecificData = require("./PaymentProduct863SpecificData");
import PaymentProductDisplayHints = require("./PaymentProductDisplayHints");
import { BasicPaymentProductJSON } from "./apimodel";

function _parseJSON(_json: BasicPaymentProductJSON, _accountsOnFile: AccountOnFile[], _accountOnFileById: { [id: number]: AccountOnFile | undefined }): void {
  if (_json.accountsOnFile) {
    for (const aof of _json.accountsOnFile) {
      const accountOnFile = new AccountOnFile(aof);
      _accountsOnFile.push(accountOnFile);
      _accountOnFileById[accountOnFile.id] = accountOnFile;
    }
  }
}

class BasicPaymentProduct {
  readonly accountsOnFile: AccountOnFile[];
  readonly accountOnFileById: { [id: number]: AccountOnFile | undefined };
  readonly allowsRecurring: boolean;
  readonly allowsTokenization: boolean;
  readonly autoTokenized: boolean;
  readonly allowsInstallments: boolean;
  readonly acquirerCountry?: string;
  readonly displayHints: PaymentProductDisplayHints;
  readonly id: number;
  readonly maxAmount?: number;
  readonly minAmount?: number;
  readonly paymentMethod: string;
  readonly mobileIntegrationLevel: string;
  readonly usesRedirectionTo3rdParty: boolean;
  readonly paymentProductGroup?: string;
  readonly paymentProduct302SpecificData?: PaymentProduct302SpecificData;
  readonly paymentProduct320SpecificData?: PaymentProduct320SpecificData;
  readonly paymentProduct863SpecificData?: PaymentProduct863SpecificData;
  readonly type = "product";

  constructor(readonly json: BasicPaymentProductJSON) {
    this.json.type = "product";
    this.accountsOnFile = [];
    this.accountOnFileById = {};
    this.allowsRecurring = json.allowsRecurring;
    this.allowsTokenization = json.allowsTokenization;
    this.autoTokenized = json.autoTokenized;
    this.allowsInstallments = json.allowsInstallments;
    this.acquirerCountry = json.acquirerCountry;
    this.displayHints = new PaymentProductDisplayHints(json.displayHints);
    this.id = json.id;
    this.maxAmount = json.maxAmount;
    this.minAmount = json.minAmount;
    this.paymentMethod = json.paymentMethod;
    this.mobileIntegrationLevel = json.mobileIntegrationLevel;
    this.usesRedirectionTo3rdParty = json.usesRedirectionTo3rdParty;
    this.paymentProductGroup = json.paymentProductGroup;

    if (json.paymentProduct302SpecificData) {
      this.paymentProduct302SpecificData = new PaymentProduct302SpecificData(json.paymentProduct302SpecificData);
    }
    if (json.paymentProduct320SpecificData) {
      this.paymentProduct320SpecificData = new PaymentProduct320SpecificData(json.paymentProduct320SpecificData);
    }
    if (json.paymentProduct863SpecificData) {
      this.paymentProduct863SpecificData = new PaymentProduct863SpecificData(json.paymentProduct863SpecificData);
    }

    _parseJSON(json, this.accountsOnFile, this.accountOnFileById);
  }

  copy(): BasicPaymentProduct {
    const json = JSON.parse(JSON.stringify(this.json)) as BasicPaymentProductJSON;
    return new BasicPaymentProduct(json);
  }
}

export = BasicPaymentProduct;
