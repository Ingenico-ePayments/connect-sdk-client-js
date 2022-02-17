///<amd-module name="connectsdk.ValidationRuleBoletoBancarioRequiredness"/>

import { BoletoBancarioRequirednessValidatorJSON } from "./apimodel";
import { ValidatableRequest, ValidationRule, ValidationRuleDefinition } from "./types";

class ValidationRuleBoletoBancarioRequiredness implements ValidationRule {
  readonly type: string;
  readonly errorMessageId: string;
  readonly fiscalNumberLength: number;

  constructor(readonly json: ValidationRuleDefinition<BoletoBancarioRequirednessValidatorJSON>) {
    this.type = json.type;
    this.errorMessageId = json.type;
    this.fiscalNumberLength = json.attributes.fiscalNumberLength;
  }

  validate(value: string, fiscalNumberValue?: string): boolean {
    if (typeof fiscalNumberValue === "undefined") {
      fiscalNumberValue = "";
    }

    return (fiscalNumberValue.length === this.fiscalNumberLength && value.length > 0) || fiscalNumberValue.length !== this.fiscalNumberLength;
  }

  validateValue(request: ValidatableRequest, fieldId: string): boolean {
    const fiscalNumber = request.getUnmaskedValue("fiscalNumber");
    const fiscalNumberLength = fiscalNumber?.length || 0;
    if (fiscalNumberLength !== this.fiscalNumberLength) {
      // The field is not required for Boleto; allow anything
      return true;
    }

    const value = request.getValue(fieldId);
    return !!value;
  }
}

export = ValidationRuleBoletoBancarioRequiredness;
