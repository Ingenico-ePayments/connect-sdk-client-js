///<amd-module name="connectsdk.ValidationRuleResidentIdNumber"/>

import { EmptyValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

const weights: number[] = [];

// https://en.wikipedia.org/wiki/Resident_Identity_Card
// storing weights in the reverse order so that we can begin
// from the 0th position of ID while calculating checksum
for (let i = 18; i > 0; i--) {
  weights.push(Math.pow(2, i - 1) % 11);
}

class ValidationRuleResidentIdNumber implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;

  constructor(readonly json: ValidationRuleDefinition<EmptyValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
  }

  validate(value: string): boolean {
    if (value.length < 15) {
      return false;
    }

    if (value.length == 15) {
      return /^\d{15}$/.test(value);
    }

    if (value.length !== 18) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < value.length - 1; i++) {
      sum += Number(value.charAt(i)) * weights[i];
    }

    const checkSum = (12 - (sum % 11)) % 11;
    const csChar = value.charAt(17);

    if (checkSum < 10) {
      return checkSum == Number(csChar); // check only values
    }

    return !!csChar && csChar.toUpperCase() === "X"; // check the type as well
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    return !!value && this.validate(value);
  }
}

export = ValidationRuleResidentIdNumber;
