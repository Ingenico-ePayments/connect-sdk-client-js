///<amd-module name="connectsdk.ValidationRuleFixedList"/>

import { FixedListValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

class ValidationRuleFixedList implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;
  readonly allowedValues: string[];

  constructor(readonly json: ValidationRuleDefinition<FixedListValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
    this.allowedValues = json.attributes.allowedValues;
  }

  validate(value: string): boolean {
    for (const allowedValue of this.allowedValues) {
      if (allowedValue === value) {
        return true;
      }
    }
    return false;
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    return !!value && this.validate(value);
  }
}

export = ValidationRuleFixedList;
