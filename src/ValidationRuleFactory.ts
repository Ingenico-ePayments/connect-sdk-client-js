///<amd-module name="connectsdk.ValidationRuleFactory"/>

import { ValidationRule, ValidationRuleDefinition } from "./types";
import ValidationRuleBoletoBancarioRequiredness = require("./ValidationRuleBoletoBancarioRequiredness");
import ValidationRuleEmailAddress = require("./ValidationRuleEmailAddress");
import ValidationRuleExpirationDate = require("./ValidationRuleExpirationDate");
import ValidationRuleFixedList = require("./ValidationRuleFixedList");
import ValidationRuleIban = require("./ValidationRuleIban");
import ValidationRuleLength = require("./ValidationRuleLength");
import ValidationRuleLuhn = require("./ValidationRuleLuhn");
import ValidationRuleRange = require("./ValidationRuleRange");
import ValidationRuleRegularExpression = require("./ValidationRuleRegularExpression");
import ValidationRuleResidentIdNumber = require("./ValidationRuleResidentIdNumber");
import ValidationRuleTermsAndConditions = require("./ValidationRuleTermsAndConditions");

const validationRules = {
  EmailAddress: ValidationRuleEmailAddress,
  TermsAndConditions: ValidationRuleTermsAndConditions,
  ExpirationDate: ValidationRuleExpirationDate,
  FixedList: ValidationRuleFixedList,
  Length: ValidationRuleLength,
  Luhn: ValidationRuleLuhn,
  Range: ValidationRuleRange,
  RegularExpression: ValidationRuleRegularExpression,
  BoletoBancarioRequiredness: ValidationRuleBoletoBancarioRequiredness,
  Iban: ValidationRuleIban,
  ResidentIdNumber: ValidationRuleResidentIdNumber,
};

class ValidationRuleFactory {
  makeValidator(json: ValidationRuleDefinition<unknown>): ValidationRule | null {
    const rule = json.type.charAt(0).toUpperCase() + json.type.slice(1);
    try {
      return new validationRules[rule](json);
    } catch (e) {
      console.warn("no validator for ", rule);
    }
    return null;
  }
}

export = ValidationRuleFactory;
