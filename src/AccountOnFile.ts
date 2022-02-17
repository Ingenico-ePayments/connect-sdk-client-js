///<amd-module name="connectsdk.AccountOnFile"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import AccountOnFileDisplayHints = require("./AccountOnFileDisplayHints");
import { AccountOnFileJSON } from "./apimodel";
import Attribute = require("./Attribute");
import MaskedString = require("./MaskedString");
import MaskingUtil = require("./MaskingUtil");

function _parseJSON(_json: AccountOnFileJSON, _attributes: Attribute[], _attributeByKey: { [key: string]: Attribute | undefined }): void {
  if (_json.attributes) {
    for (const attr of _json.attributes) {
      const attribute = new Attribute(attr);
      _attributes.push(attribute);
      _attributeByKey[attribute.key] = attribute;
    }
  }
}

class AccountOnFile {
  readonly attributes: Attribute[];
  readonly attributeByKey: { [key: string]: Attribute | undefined };
  readonly displayHints: AccountOnFileDisplayHints;
  readonly id: number;
  readonly paymentProductId: number;

  constructor(readonly json: AccountOnFileJSON) {
    this.attributes = [];
    this.attributeByKey = {};
    this.displayHints = new AccountOnFileDisplayHints(json.displayHints);
    this.id = json.id;
    this.paymentProductId = json.paymentProductId;

    _parseJSON(json, this.attributes, this.attributeByKey);
  }

  getMaskedValueByAttributeKey(attributeKey: string): MaskedString | undefined {
    const value = this.attributeByKey[attributeKey]!.value;
    let wildcardMask: string | undefined;
    try {
      wildcardMask = this.displayHints.labelTemplateElementByAttributeKey[attributeKey]!.wildcardMask;
    } catch (e) {
      /* ignore */
    }
    if (value !== undefined && wildcardMask !== undefined) {
      const maskingUtil = new MaskingUtil();
      return maskingUtil.applyMask(wildcardMask, value);
    }
    return undefined;
  }
}

export = AccountOnFile;
