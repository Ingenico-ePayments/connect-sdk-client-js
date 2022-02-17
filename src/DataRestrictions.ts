///<amd-module name="connectsdk.DataRestrictions"/>

import { PaymentProductFieldDataRestrictionsJSON } from "./apimodel";
import { ValidationRule } from "./types";
import ValidationRuleFactory = require("./ValidationRuleFactory");

function _parseJSON(
  _json: PaymentProductFieldDataRestrictionsJSON,
  _validationRules: ValidationRule[],
  _validationRuleByType: { [type: string]: ValidationRule | undefined }
): void {
  const validationRuleFactory = new ValidationRuleFactory();
  if (_json.validators) {
    for (const key in _json.validators) {
      const validationRule = validationRuleFactory.makeValidator({
        type: key,
        attributes: _json.validators[key],
      });
      if (validationRule) {
        _validationRules.push(validationRule);
        _validationRuleByType[validationRule.type] = validationRule;
      }
    }
  }
}

class DataRestrictions {
  readonly isRequired: boolean;
  readonly validationRules: ValidationRule[];
  readonly validationRuleByType: { [type: string]: ValidationRule | undefined };

  constructor(readonly json: PaymentProductFieldDataRestrictionsJSON) {
    this.isRequired = json.isRequired;
    this.validationRules = [];
    this.validationRuleByType = {};

    _parseJSON(json, this.validationRules, this.validationRuleByType);
  }
}

export = DataRestrictions;
