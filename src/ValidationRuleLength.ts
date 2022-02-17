///<amd-module name="connectsdk.ValidationRuleLength"/>

import { LengthValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

class ValidationRuleLength implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;
  readonly minLength: number;
  readonly maxLength: number;

  constructor(readonly json: ValidationRuleDefinition<LengthValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
    this.minLength = json.attributes.minLength;
    this.maxLength = json.attributes.maxLength;
  }

  validate(value: string): boolean {
    return this.minLength <= value.length && value.length <= this.maxLength;
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    if (!value) {
      // Empty values are allowed if the minimal required length is 0
      return this.minLength === 0;
    }
    return this.validate(value);
  }
}

export = ValidationRuleLength;
