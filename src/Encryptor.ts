///<amd-module name="connectsdk.Encryptor"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as forge from "node-forge";
import JOSEEncryptor = require("./JOSEEncryptor");
import PaymentRequest = require("./PaymentRequest");
import Promise = require("./promise");
import PublicKeyResponse = require("./PublicKeyResponse");
import Util = require("./Util");
import { DeviceInformation } from "./types";

const util = Util.getInstance();

interface EncryptedCustomerInput {
  clientSessionId: string;
  nonce: string;
  paymentProductId: number;
  accountOnFileId?: number;
  tokenize?: boolean;
  paymentValues: { key: string; value: string }[];
  collectedDeviceInformation: DeviceInformation;
}

function createEncryptedConsumerInput(paymentRequest: PaymentRequest): EncryptedCustomerInput {
  const blob: EncryptedCustomerInput = {
    clientSessionId: paymentRequest.getClientSessionID(),
    nonce: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    paymentProductId: paymentRequest.getPaymentProduct()!.id,
    tokenize: paymentRequest.getTokenize(),
    paymentValues: [],
    collectedDeviceInformation: util.collectDeviceInformation(),
  };

  const accountOnFile = paymentRequest.getAccountOnFile();
  if (accountOnFile) {
    blob.accountOnFileId = accountOnFile.id;
  }

  const values = paymentRequest.getUnmaskedValues();
  const ownValues = Object.getOwnPropertyNames(values);
  for (const propertyName of ownValues) {
    if (propertyName !== "length") {
      blob.paymentValues.push({
        key: propertyName,
        value: values[propertyName]!,
      });
    }
  }

  return blob;
}

class Encryptor {
  /**
   * Encrypts the given payment request. Calls {@link PaymentRequest.validate}, so it's not necessary to do that first.
   * If validation fails, the returned promise is rejected with the validation errors.
   */
  readonly encrypt: (paymentRequest: PaymentRequest) => Promise<string>;

  constructor(publicKeyResponsePromise: Promise<PublicKeyResponse>) {
    this.encrypt = (paymentRequest: PaymentRequest): Promise<string> => {
      if (!paymentRequest.getPaymentProduct()) {
        return Promise.reject("no paymentProduct set");
      }
      const errors = paymentRequest.validate();
      if (errors.length !== 0) {
        return Promise.reject(errors);
      }

      // paymentRequest is now valid
      const blob = createEncryptedConsumerInput(paymentRequest);

      const promise = new Promise<string>();
      publicKeyResponsePromise.then(
        (publicKeyResponse) => {
          // use blob to encrypt
          const joseEncryptor = new JOSEEncryptor();
          try {
            const encryptedString = joseEncryptor.encrypt(blob, publicKeyResponse);
            promise.resolve(encryptedString);
          } catch (e) {
            promise.reject(e);
          }
        },
        (reason) => {
          promise.reject(reason);
        }
      );
      return promise;
    };
  }
}

export = Encryptor;
