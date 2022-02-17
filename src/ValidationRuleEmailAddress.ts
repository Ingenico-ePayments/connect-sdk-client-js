///<amd-module name="connectsdk.ValidationRuleEmailAddress"/>

import { EmptyValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

class ValidationRuleEmailAddress implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;

  constructor(readonly json: ValidationRuleDefinition<EmptyValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
  }

  validate(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regexp = new RegExp(/^[^@\.]+(\.[^@\.]+)*@([^@\.]+\.)*[^@\.]+\.[^@\.][^@\.]+$/i);
    return regexp.test(value);
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const value = request.getUnmaskedValue(fieldId);
    return !!value && this.validate(value);
  }
}

export = ValidationRuleEmailAddress;
