/**
 * @group unit:encryptor
 */

// Util.getInstance().collectDeviceInformation needs to be mocked because it depends on navigator which is not available

const util: Util = {
  applePayPaymentProductId: 302,
  googlePayPaymentProductId: 320,
  bancontactPaymentProductId: 3012,
  paymentProductsThatAreNotSupportedInThisBrowser: [],
  getMetadata: () => {
    throw new Error("not implemented");
  },
  collectDeviceInformation: () => ({
    timezoneOffsetUtcMinutes: 60,
    locale: "en_GB",
    browserData: {
      javaScriptEnabled: true,
      javaEnabled: false,
      colorDepth: 32,
      screenHeight: 100,
      screenWidth: 100,
      innerHeight: 100,
      innerWidth: 100,
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  base64Encode: (_data) => {
    throw new Error("not implemented");
  },
  filterOutProductsThatAreNotSupportedInThisBrowser: () => {
    throw new Error("not implemented");
  },
};

jest.mock("../src/Util", () => ({
  getInstance: (): Util => util,
}));

import { PaymentProductFieldJSON, PaymentProductJSON } from "../src/apimodel";
import Encryptor = require("../src/Encryptor");
import PaymentProduct = require("../src/PaymentProduct");
import PaymentRequest = require("../src/PaymentRequest");
import Promise = require("../src/promise");
import PublicKeyResponse = require("../src/PublicKeyResponse");
import { Util } from "../src/types";

const publicKeyResponse = new PublicKeyResponse({
  keyId: "2c3363b2-ce03-4079-90db-c8bf381ac49c",
  publicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnCGiSURrr/U9+0hpG7fgwJgnHODLjwUZRRbS0Xb5U25V1LlpNx40NvS2KTQ8i301cjWGl3FAjHRd54z/xGcEXb3/uIXprGNzqabK3D6awSma+ONlzuEFTzbdTMDd0iNDrhEgUekAaKPRDI94EhAoHKq8fIGbkovBSh87+TKMlq6Q1itV3nPve7kJ9dMLh+FpQyQkM3pRR9QZRAtT+3/fr0+H/beZyiN0VnQtJr2H1tvCBWOPIajdlZChr4wjWoLIpvcKesclDHh7DOf4INvujUtirq9JwXvh5W7Lo+S6yglbQQUW9mR6Rk7IaVfkAScBxML6SQM3N10oUcyHx6oaBQIDAQAB",
});

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

function base64Decode(data: string): string {
  return Buffer.from(data, "base64").toString("ascii");
}

describe("encrypt", () => {
  test("no product", (done) => {
    const request = new PaymentRequest("sessionId");

    const encryptor = new Encryptor(Promise.resolve(publicKeyResponse));
    encryptor.encrypt(request).then(jest.fn(), (reason) => {
      expect(reason).toBe("no paymentProduct set");

      done();
    });
  });

  test("invalid request", (done) => {
    const request = new PaymentRequest("sessionId");
    request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
    request.setValue(field.id, "4567350000427978");

    const encryptor = new Encryptor(Promise.resolve(publicKeyResponse));
    encryptor.encrypt(request).then(jest.fn(), (reason) => {
      expect(reason).toStrictEqual([{ fieldId: field.id, errorMessageId: "luhn" }]);

      done();
    });
  });

  test("valid request", (done) => {
    const request = new PaymentRequest("sessionId");
    request.setPaymentProduct(new PaymentProduct(Object.assign({}, paymentProductJSON, { fields: [field] })));
    request.setValue(field.id, "4567350000427977");

    const encryptor = new Encryptor(Promise.resolve(publicKeyResponse));
    encryptor.encrypt(request).then((encryptedString) => {
      const parts = encryptedString.split(".");
      expect(parts.length).toBe(5);

      // Only the header can be checked at this point, the rest is binary data
      const header = JSON.parse(base64Decode(parts[0]));
      expect(header).toStrictEqual({
        alg: "RSA-OAEP",
        enc: "A256CBC-HS512",
        kid: publicKeyResponse.keyId,
      });

      done();
    });
  });
});
