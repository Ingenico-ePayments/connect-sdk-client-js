///<amd-module name="connectsdk.PaymentProductField"/>

import { PaymentProductFieldJSON } from "./apimodel";
import DataRestrictions = require("./DataRestrictions");
import MaskedString = require("./MaskedString");
import MaskingUtil = require("./MaskingUtil");
import PaymentProductFieldDisplayHints = require("./PaymentProductFieldDisplayHints");
import { ValidatableRequest } from "./types";

class PaymentProductField {
  readonly displayHints: PaymentProductFieldDisplayHints | "";
  readonly dataRestrictions: DataRestrictions;
  readonly id: string;
  readonly type: string;

  /**
   * @deprecated This function does not take into account other fields that may be of importance for the validation.
   *             Use {@link .getErrorMessageIds} instead.
   */
  readonly getErrorCodes: (value?: string) => string[];
  readonly getErrorMessageIds: (request?: ValidatableRequest) => string[];
  /**
   * @deprecated This function does not take into account other fields that may be of importance for the validation.
   *             Use {@link .validateValue} instead.
   */
  readonly isValid: (value: string) => boolean;
  readonly validateValue: (request: ValidatableRequest) => boolean;

  constructor(readonly json: PaymentProductFieldJSON) {
    this.displayHints = json.displayHints ? new PaymentProductFieldDisplayHints(json.displayHints) : "";
    this.dataRestrictions = new DataRestrictions(json.dataRestrictions);
    this.id = json.id;
    this.type = json.type;

    let _errorCodes: string[] = [];

    this.getErrorCodes = (value?: string): string[] => {
      if (value) {
        _errorCodes = [];
        this.isValid(value);
      }
      return _errorCodes;
    };

    this.getErrorMessageIds = (request?: ValidatableRequest): string[] => {
      if (request) {
        _errorCodes = [];
        this.validateValue(request);
      }
      return _errorCodes;
    };

    this.isValid = (value: string): boolean => {
      // isValid checks all datarestrictions
      const validators = this.dataRestrictions.validationRules;
      let hasError = false;

      // Apply masking value first
      const maskedValue = this.applyMask(value);
      value = this.removeMask(maskedValue.formattedValue);
      for (const validator of validators) {
        if (!validator.validate(value)) {
          hasError = true;
          _errorCodes.push(validator.errorMessageId);
        }
      }
      return !hasError;
    };

    this.validateValue = (request: ValidatableRequest): boolean => {
      // validateValue checks all datarestrictions
      const validators = this.dataRestrictions.validationRules;
      let hasError = false;

      for (const validator of validators) {
        if (!validator.validateValue(request, this.id)) {
          hasError = true;
          _errorCodes.push(validator.errorMessageId);
        }
      }
      return !hasError;
    };
  }

  applyMask(newValue: string, oldValue?: string): MaskedString {
    const maskingUtil = new MaskingUtil();
    const mask = this.displayHints ? this.displayHints.mask : undefined;
    return maskingUtil.applyMask(mask, newValue, oldValue);
  }

  applyWildcardMask(newValue: string, oldValue?: string): MaskedString {
    const maskingUtil = new MaskingUtil();
    const wildcardMask = this.displayHints ? this.displayHints.wildcardMask : undefined;
    return maskingUtil.applyMask(wildcardMask, newValue, oldValue);
  }

  removeMask(value: string): string {
    const maskingUtil = new MaskingUtil();
    const mask = this.displayHints ? this.displayHints.mask : undefined;
    return maskingUtil.removeMask(mask, value);
  }
}

export = PaymentProductField;
