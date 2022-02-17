/**
 * @group unit:PaymentRequest
 */

import AccountOnFile = require("../src/AccountOnFile");
import { PaymentProductFieldJSON, PaymentProductJSON } from "../src/apimodel";
import PaymentProduct = require("../src/PaymentProduct");
import PaymentRequest = require("../src/PaymentRequest");

const paymentProductJSON: PaymentProductJSON = {
  allowsInstallments: false,
  allowsRecurring: false,
  allowsTokenization: false,
  autoTokenized: false,
  deviceFingerprintEnabled: false,
  displayHints: {
    displayOrder: 0,
    logo: "",
  },
  fields: [],
  id: 1,
  mobileIntegrationLevel: "",
  paymentMethod: "card",
  type: "product",
  usesRedirectionTo3rdParty: false,
};

describe("PaymentRequest", () => {
  describe("validate", () => {
    test("without paymentProduct", () => {
      const request = new PaymentRequest("sessionId");
      try {
        request.validate();
        fail("Expected error");
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = (e as any).message;
        expect(message).toBe("Error validating PaymentRequest, please set a paymentProduct first.");
      }
    });

    describe("with paymentProduct", () => {
      test("without fields", () => {
        const request = new PaymentRequest("sessionId");
        request.setPaymentProduct(
          new PaymentProduct(
            Object.assign({}, paymentProductJSON, {
              fields: [],
            })
          )
        );
        const errors = request.validate();
        expect(errors).toStrictEqual([]);
      });

      const field: PaymentProductFieldJSON = {
        dataRestrictions: {
          isRequired: true,
          validators: {
            luhn: {},
          },
        },
        id: "cardNumber",
        type: "numericstring",
      };

      test("with missing field", () => {
        const request = new PaymentRequest("sessionId");
        request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
        const errors = request.validate();
        expect(errors).toStrictEqual([{ fieldId: field.id, errorMessageId: "required" }]);
      });

      test("with valid field value", () => {
        const request = new PaymentRequest("sessionId");
        request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
        request.setValue(field.id, "4567350000427977");
        const errors = request.validate();
        expect(errors).toStrictEqual([]);
      });

      test("with validation errors", () => {
        const request = new PaymentRequest("sessionId");
        request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
        request.setValue(field.id, "");
        const errors = request.validate();
        expect(errors).toStrictEqual([
          { fieldId: field.id, errorMessageId: "luhn" },
          { fieldId: field.id, errorMessageId: "required" },
        ]);
      });

      describe("with field provided by account on file", () => {
        test("with read-only value", () => {
          const request = new PaymentRequest("sessionId");
          request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
          request.setAccountOnFile(
            new AccountOnFile({
              id: 0,
              paymentProductId: paymentProductJSON.id,
              displayHints: {
                logo: "",
                labelTemplate: [],
              },
              attributes: [
                {
                  key: "cardNumber",
                  value: "************7977",
                  status: "READ_ONLY",
                },
              ],
            })
          );
          const errors = request.validate();
          expect(errors).toStrictEqual([]);
        });

        describe("with must-write attribute", () => {
          const accountOnFile = new AccountOnFile({
            id: 0,
            paymentProductId: paymentProductJSON.id,
            displayHints: {
              logo: "",
              labelTemplate: [],
            },
            attributes: [
              {
                key: "cardNumber",
                value: "************7977",
                status: "MUST_WRITE",
              },
            ],
          });

          test("without overridden value", () => {
            const request = new PaymentRequest("sessionId");
            request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
            request.setAccountOnFile(accountOnFile);
            const errors = request.validate();
            expect(errors).toStrictEqual([
              {
                fieldId: "cardNumber",
                errorMessageId: "required",
              },
            ]);
          });

          test("with overridden value", () => {
            const request = new PaymentRequest("sessionId");
            request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
            request.setAccountOnFile(accountOnFile);
            request.setValue("cardNumber", "4567350000427977");
            const errors = request.validate();
            expect(errors).toStrictEqual([]);
          });
        });
      });
    });
  });
});
