///<amd-module name="connectsdk.ValidationRuleRange"/>

import { RangeValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

class ValidationRuleRange implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;
  readonly minValue: number;
  readonly maxValue: number;

  constructor(readonly json: ValidationRuleDefinition<RangeValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
    this.minValue = json.attributes.minValue;
    this.maxValue = json.attributes.maxValue;
  }

  validate(value: string | number): boolean {
    const intValue = typeof value === "number" ? value : parseInt(value);
    if (isNaN(intValue)) {
      return false;
    }
    return this.minValue <= intValue && intValue <= this.maxValue;
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    return !!value && this.validate(value);
  }
}

export = ValidationRuleRange;
