/**
 * @group unit:validation
 */

import dateformat = require("dateformat");
import { PaymentProductFieldJSON, PaymentProductJSON } from "../src/apimodel";
import PaymentProduct = require("../src/PaymentProduct");
import PaymentRequest = require("../src/PaymentRequest");
import ValidationRuleBoletoBancarioRequiredness = require("../src/ValidationRuleBoletoBancarioRequiredness");
import ValidationRuleEmailAddress = require("../src/ValidationRuleEmailAddress");
import ValidationRuleExpirationDate = require("../src/ValidationRuleExpirationDate");
import ValidationRuleFixedList = require("../src/ValidationRuleFixedList");
import ValidationRuleIban = require("../src/ValidationRuleIban");
import ValidationRuleLength = require("../src/ValidationRuleLength");
import ValidationRuleLuhn = require("../src/ValidationRuleLuhn");
import ValidationRuleRange = require("../src/ValidationRuleRange");
import ValidationRuleRegularExpression = require("../src/ValidationRuleRegularExpression");
import ValidationRuleResidentIdNumber = require("../src/ValidationRuleResidentIdNumber");
import ValidationRuleTermsAndConditions = require("../src/ValidationRuleTermsAndConditions");

const paymentProductField: PaymentProductFieldJSON = {
  id: "dummy",
  type: "string",
  dataRestrictions: {
    isRequired: true,
    validators: {},
  },
};
const fiscalNumberField: PaymentProductFieldJSON = {
  id: "fiscalNumber",
  type: "string",
  dataRestrictions: {
    isRequired: false,
    validators: {},
  },
};
const paymentProduct: PaymentProductJSON = {
  allowsInstallments: false,
  allowsRecurring: false,
  allowsTokenization: false,
  autoTokenized: false,
  deviceFingerprintEnabled: false,
  displayHints: {
    displayOrder: 0,
    logo: "",
  },
  fields: [paymentProductField, fiscalNumberField],
  id: 1,
  mobileIntegrationLevel: "",
  paymentMethod: "card",
  type: "product",
  usesRedirectionTo3rdParty: false,
};

function createPaymentRequest(): PaymentRequest {
  const paymentRequest = new PaymentRequest("sessionId");
  paymentRequest.setPaymentProduct(new PaymentProduct(paymentProduct));
  return paymentRequest;
}

describe("validation", () => {
  describe("Boleto Bancario requiredness", () => {
    const rule = new ValidationRuleBoletoBancarioRequiredness({
      type: "boletoBancarioRequiredness",
      attributes: {
        fiscalNumberLength: 3,
      },
    });

    describe("with fiscalNumber of required length", () => {
      const fiscalNumber = "123";

      test("missing", () => {
        const paymentRequest = createPaymentRequest();
        paymentRequest.setValue("fiscalNumber", fiscalNumber);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
        // rule.validate needs a string value
      });

      test("empty", () => {
        const paymentRequest = createPaymentRequest();
        const value = "";
        paymentRequest.setValue(paymentProductField.id, value);
        paymentRequest.setValue("fiscalNumber", fiscalNumber);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
        expect(rule.validate(value, fiscalNumber)).toBe(false);
      });

      test("valid", () => {
        const paymentRequest = createPaymentRequest();
        const value = "value";
        paymentRequest.setValue(paymentProductField.id, value);
        paymentRequest.setValue("fiscalNumber", fiscalNumber);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        expect(rule.validate(value, fiscalNumber)).toBe(true);
      });
    });

    describe("with fiscalNumber of different length", () => {
      const fiscalNumber = "1";

      test("missing", () => {
        const paymentRequest = createPaymentRequest();
        paymentRequest.setValue("fiscalNumber", fiscalNumber);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        // rule.validate needs a string value
      });

      test("empty", () => {
        const paymentRequest = createPaymentRequest();
        const value = "";
        paymentRequest.setValue(paymentProductField.id, value);
        paymentRequest.setValue("fiscalNumber", fiscalNumber);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        expect(rule.validate(value, fiscalNumber)).toBe(true);
      });

      test("valid", () => {
        const paymentRequest = createPaymentRequest();
        const value = "value";
        paymentRequest.setValue(paymentProductField.id, value);
        paymentRequest.setValue("fiscalNumber", fiscalNumber);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        expect(rule.validate(value, fiscalNumber)).toBe(true);
      });
    });

    describe("without fiscalNumber", () => {
      test("missing", () => {
        const paymentRequest = createPaymentRequest();
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        // rule.validate needs a string value
      });

      test("empty", () => {
        const paymentRequest = createPaymentRequest();
        const value = "";
        paymentRequest.setValue(paymentProductField.id, value);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        expect(rule.validate(value)).toBe(true);
      });

      test("valid", () => {
        const paymentRequest = createPaymentRequest();
        const value = "value";
        paymentRequest.setValue(paymentProductField.id, value);
        expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
        expect(rule.validate(value)).toBe(true);
      });
    });
  });

  describe("email address", () => {
    const rule = new ValidationRuleEmailAddress({ type: "email", attributes: {} });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "aa@bb.com";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("invalid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "aa2bb.com";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("expiration date", () => {
    const rule = new ValidationRuleExpirationDate({ type: "expirationDate", attributes: {} });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const date = new Date();
      const value = dateformat(date, "mmyy");
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("expired", () => {
      const paymentRequest = createPaymentRequest();
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      // DST can cause October 31st minus 1 month to be October 1st; subtract another day if that occurs
      if (date.getMonth() === new Date().getMonth()) {
        date.setDate(date.getDate() - 1);
      }
      const value = dateformat(date, "mmyy");
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("invalid format", () => {
      const paymentRequest = createPaymentRequest();
      const value = "12345";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("fixed list", () => {
    const rule = new ValidationRuleFixedList({
      type: "fixedList",
      attributes: {
        allowedValues: ["a", "b", "c"],
      },
    });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "a";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("invalid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "d";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("IBAN", () => {
    const rule = new ValidationRuleIban({ type: "iban", attributes: {} });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "GB33BUKB20201555555555";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("invalid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "GB94BARC20201530093459";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("length", () => {
    const rule = new ValidationRuleLength({
      type: "length",
      attributes: {
        minLength: 2,
        maxLength: 5,
      },
    });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid at min", () => {
      const paymentRequest = createPaymentRequest();
      const value = "12";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("valid at max", () => {
      const paymentRequest = createPaymentRequest();
      const value = "12345";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("value too short", () => {
      const paymentRequest = createPaymentRequest();
      const value = "1";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("value too long", () => {
      const paymentRequest = createPaymentRequest();
      const value = "123456";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("Luhn", () => {
    const rule = new ValidationRuleLuhn({ type: "luhn", attributes: {} });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "4242424242424242";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("invalid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "1142424242424242";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("range", () => {
    const rule = new ValidationRuleRange({
      type: "length",
      attributes: {
        minValue: 2,
        maxValue: 5,
      },
    });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid at min", () => {
      const paymentRequest = createPaymentRequest();
      const value = "2";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("valid at max", () => {
      const paymentRequest = createPaymentRequest();
      const value = "5";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("value too low", () => {
      const paymentRequest = createPaymentRequest();
      const value = "1";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("value too high", () => {
      const paymentRequest = createPaymentRequest();
      const value = "6";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("regex", () => {
    const rule = new ValidationRuleRegularExpression({
      type: "regularExpression",
      attributes: {
        regularExpression: "\\d{2}[a-z]{2}[A-Z]{3}",
      },
    });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "11atAAB";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("invalid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "abcabcabc";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("resident ID number", () => {
    const rule = new ValidationRuleResidentIdNumber({ type: "residentIdNumber", attributes: {} });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    const validValues = [
      "123456789012345", // old ID card format contains only 15 digits and no checksum, this is valid
      "110101202002042275",
      "110101202002049979",
      "11010120200211585X",
      "11010120200211585x",
      "11010120200325451X",
      "11010120200325451x",
    ];
    test.each(validValues)("valid", (value: string) => {
      const paymentRequest = createPaymentRequest();
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    const invalidValues = [
      "1234567890",
      "12345678901234X",
      "12345678901234x",
      "12345678901234a",
      "110101202002042274",
      "1101012020020227a4",
      "b10101202002049979",
      "15242719920303047X",
      "15242719920303047x",
      "15242719920303047a",
    ];
    test.each(invalidValues)("invalid", (value: string) => {
      const paymentRequest = createPaymentRequest();
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });

  describe("terms and conditions", () => {
    const rule = new ValidationRuleTermsAndConditions({ type: "termsAndConditions", attributes: {} });

    test("missing", () => {
      const paymentRequest = createPaymentRequest();
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      // rule.validate needs a string value
    });

    test("empty", () => {
      const paymentRequest = createPaymentRequest();
      const value = "";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });

    test("valid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "true";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(true);
      expect(rule.validate(value)).toBe(true);
    });

    test("invalid", () => {
      const paymentRequest = createPaymentRequest();
      const value = "false";
      paymentRequest.setValue(paymentProductField.id, value);
      expect(rule.validateValue(paymentRequest, paymentProductField.id)).toBe(false);
      expect(rule.validate(value)).toBe(false);
    });
  });
});
