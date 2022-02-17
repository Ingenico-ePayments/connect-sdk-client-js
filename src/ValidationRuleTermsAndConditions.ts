///<amd-module name="connectsdk.ValidationRuleTermsAndConditions"/>

import { EmptyValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

class ValidationRuleTermsAndConditions implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;

  constructor(readonly json: ValidationRuleDefinition<EmptyValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
  }

  validate(value: string | boolean): boolean {
    return true === value || "true" === value;
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    return !!value && this.validate(value);
  }
}

export = ValidationRuleTermsAndConditions;
