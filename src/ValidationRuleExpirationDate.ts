///<amd-module name="connectsdk.ValidationRuleExpirationDate"/>

import { EmptyValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

function validateDateFormat(value: string): boolean {
  // value is mmYY or mmYYYY
  const pattern = /\d{4}|\d{6}$/g;
  return pattern.test(value);
}

class ValidationRuleExpirationDate implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;

  constructor(readonly json: ValidationRuleDefinition<EmptyValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
  }

  validate(value: string): boolean {
    value = value.replace(/[^\d]/g, "");
    if (!validateDateFormat(value)) {
      return false;
    }

    let split: string[];
    if (value.length === 4) {
      split = [value.substring(0, 2), "20" + value.substring(2, 4)];
    } else if (value.length === 6) {
      split = [value.substring(0, 2), value.substring(2, 6)];
    } else {
      return false;
    }

    // The month is zero-based, so subtract one.
    const expirationMonth = Number(split[0]) - 1;
    const expirationYear = Number(split[1]);
    const expirationDate = new Date(expirationYear, expirationMonth, 1);

    // Compare the input with the parsed date, to check if the date rolled over.
    if (expirationDate.getMonth() !== Number(expirationMonth) || expirationDate.getFullYear() !== Number(expirationYear)) {
      return false;
    }

    // For comparison, set the current year & month and the maximum allowed expiration date.
    const nowWithDay = new Date();
    const now = new Date(nowWithDay.getFullYear(), nowWithDay.getMonth(), 1);
    const maxExpirationDate = new Date(nowWithDay.getFullYear() + 25, 11, 1);

    // The card is still valid if it expires this month.
    return expirationDate >= now && expirationDate <= maxExpirationDate;
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    return !!value && this.validate(value);
  }
}

export = ValidationRuleExpirationDate;
