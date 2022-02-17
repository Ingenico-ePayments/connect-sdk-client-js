///<amd-module name="connectsdk.Session"/>

import BasicPaymentItems = require("./BasicPaymentItems");
import BasicPaymentProductGroups = require("./BasicPaymentProductGroups");
import BasicPaymentProducts = require("./BasicPaymentProducts");
import C2SCommunicator = require("./C2SCommunicator");
import C2SCommunicatorConfiguration = require("./C2SCommunicatorConfiguration");
import C2SPaymentProductContext = require("./C2SPaymentProductContext");
import Encryptor = require("./Encryptor");
import IinDetailsResponse = require("./IinDetailsResponse");
import PaymentProduct = require("./PaymentProduct");
import PaymentProductGroup = require("./PaymentProductGroup");
import PaymentRequest = require("./PaymentRequest");
import Promise = require("./promise");
import PublicKeyResponse = require("./PublicKeyResponse");
import {
  ConvertAmountJSON,
  CreatePaymentProductSessionResponseJSON,
  DirectoryJSON,
  GetCustomerDetailsRequestJSON,
  GetCustomerDetailsResponseJSON,
  PaymentProductGroupJSON,
  PaymentProductJSON,
  PaymentProductNetworksResponseJSON,
  ThirdPartyStatusResponseJSON,
} from "./apimodel";
import { ApplePayInitResult, ApplePaySpecificInput, PaymentDetails, PaymentProductSessionContext, PaymentProductSpecificInputs, SessionDetails } from "./types";

const APIVERSION = "client/v1";

// Keep the lowercase name for backward compatibility
// eslint-disable-next-line @typescript-eslint/naming-convention
class session {
  readonly clientApiUrl: string;
  readonly assetUrl: string;

  readonly getBasicPaymentProducts: (paymentDetails: PaymentDetails, paymentProductSpecificInputs?: PaymentProductSpecificInputs) => Promise<BasicPaymentProducts>;
  readonly getBasicPaymentProductGroups: (paymentDetails: PaymentDetails) => Promise<BasicPaymentProductGroups>;
  readonly getBasicPaymentItems: (paymentDetails: PaymentDetails, useGroups: boolean, paymentProductSpecificInputs?: PaymentProductSpecificInputs) => Promise<BasicPaymentItems>;
  readonly getPaymentProduct: (paymentProductId: number, paymentDetails?: PaymentDetails, paymentProductSpecificInputs?: PaymentProductSpecificInputs) => Promise<PaymentProduct>;
  readonly getPaymentProductGroup: (paymentProductGroupId: string, paymentDetails?: PaymentDetails) => Promise<PaymentProductGroup>;
  readonly getIinDetails: (partialCreditCardNumber: string, paymentDetails?: PaymentDetails | null) => Promise<IinDetailsResponse>;
  readonly getPublicKey: () => Promise<PublicKeyResponse>;
  readonly getPaymentProductNetworks: (paymentProductId: number, paymentDetails: PaymentDetails) => Promise<PaymentProductNetworksResponseJSON>;
  readonly getPaymentProductDirectory: (paymentProductId: number, currencyCode: string, countryCode: string) => Promise<DirectoryJSON>;
  readonly convertAmount: (amount: number, source: string, target: string) => Promise<ConvertAmountJSON>;
  readonly getPaymentRequest: () => PaymentRequest;
  readonly getEncryptor: () => Encryptor;
  readonly getThirdPartyPaymentStatus: (paymentId: string) => Promise<ThirdPartyStatusResponseJSON>;
  readonly getCustomerDetails: (paymentProductId: number, paymentDetails: GetCustomerDetailsRequestJSON) => Promise<GetCustomerDetailsResponseJSON>;
  readonly createPaymentProductSession: (paymentProductId: number, paymentDetails: PaymentProductSessionContext) => Promise<CreatePaymentProductSessionResponseJSON>;
  readonly createApplePayPayment: (context: PaymentDetails, paymentProductSpecificInput: ApplePaySpecificInput, networks: string[]) => Promise<ApplePayInitResult>;
  /* In case a full JSON representation of a payment product is already available in context,
     this method can be used instead of getPaymentProduct for the same (but synchronous) result. */
  readonly transformPaymentProductJSON: (json: PaymentProductJSON) => PaymentProduct;
  /* In case a full JSON representation of a payment product group is already available in context,
     this method can be used instead of getPaymentProductGroup for the same (but synchronous) result. */
  readonly transformPaymentProductGroupJSON: (json: PaymentProductGroupJSON) => PaymentProductGroup;

  constructor(sessionDetails: SessionDetails, paymentProduct?: PaymentProductJSON | PaymentProductGroupJSON) {
    const _c2SCommunicatorConfiguration = new C2SCommunicatorConfiguration(sessionDetails, APIVERSION);
    const _c2sCommunicator = new C2SCommunicator(_c2SCommunicatorConfiguration, paymentProduct);
    //_paymentRequest,
    this.clientApiUrl = _c2SCommunicatorConfiguration.clientApiUrl;
    this.assetUrl = _c2SCommunicatorConfiguration.assetUrl;

    let _paymentDetails: PaymentDetails;
    let _paymentProduct: PaymentProduct | null;
    let _paymentProductGroup: PaymentProductGroup | null;
    let _paymentRequest: PaymentRequest;

    this.getBasicPaymentProducts = (paymentDetails: PaymentDetails, paymentProductSpecificInputs?: PaymentProductSpecificInputs): Promise<BasicPaymentProducts> => {
      const promise = new Promise<BasicPaymentProducts>();
      const c2SPaymentProductContext = new C2SPaymentProductContext(paymentDetails);
      _c2sCommunicator.getBasicPaymentProducts(c2SPaymentProductContext, paymentProductSpecificInputs).then(
        (json) => {
          _paymentDetails = paymentDetails;
          const paymentProducts = new BasicPaymentProducts(json);
          promise.resolve(paymentProducts);
        },
        (reason) => {
          promise.reject(reason);
        }
      );
      return promise;
    };

    this.getBasicPaymentProductGroups = (paymentDetails: PaymentDetails): Promise<BasicPaymentProductGroups> => {
      const promise = new Promise<BasicPaymentProductGroups>();
      const c2SPaymentProductContext = new C2SPaymentProductContext(paymentDetails);
      _c2sCommunicator.getBasicPaymentProductGroups(c2SPaymentProductContext).then(
        (json) => {
          _paymentDetails = paymentDetails;
          const paymentProductGroups = new BasicPaymentProductGroups(json);
          promise.resolve(paymentProductGroups);
        },
        (reason) => {
          promise.reject(reason);
        }
      );
      return promise;
    };

    this.getBasicPaymentItems = (paymentDetails: PaymentDetails, useGroups: boolean, paymentProductSpecificInputs?: PaymentProductSpecificInputs): Promise<BasicPaymentItems> => {
      const promise = new Promise<BasicPaymentItems>();
      // get products & groups
      if (useGroups) {
        this.getBasicPaymentProducts(paymentDetails, paymentProductSpecificInputs).then(
          (products) => {
            this.getBasicPaymentProductGroups(paymentDetails).then(
              (groups) => {
                const basicPaymentItems = new BasicPaymentItems(products, groups);
                promise.resolve(basicPaymentItems);
              },
              (reason) => {
                promise.reject(reason);
              }
            );
          },
          (reason) => {
            promise.reject(reason);
          }
        );
      } else {
        this.getBasicPaymentProducts(paymentDetails, paymentProductSpecificInputs).then(
          (products) => {
            const basicPaymentItems = new BasicPaymentItems(products, null);
            promise.resolve(basicPaymentItems);
          },
          (reason) => {
            promise.reject(reason);
          }
        );
      }
      return promise;
    };

    this.getPaymentProduct = (paymentProductId: number, paymentDetails?: PaymentDetails, paymentProductSpecificInputs?: PaymentProductSpecificInputs): Promise<PaymentProduct> => {
      const promise = new Promise<PaymentProduct>();
      const c2SPaymentProductContext = new C2SPaymentProductContext(_paymentDetails || paymentDetails);
      _c2sCommunicator.getPaymentProduct(paymentProductId, c2SPaymentProductContext, paymentProductSpecificInputs).then(
        (response) => {
          _paymentProduct = new PaymentProduct(response);
          promise.resolve(_paymentProduct);
        },
        (reason) => {
          _paymentProduct = null;
          promise.reject(reason);
        }
      );
      return promise;
    };

    this.getPaymentProductGroup = (paymentProductGroupId: string, paymentDetails?: PaymentDetails): Promise<PaymentProductGroup> => {
      const promise = new Promise<PaymentProductGroup>();
      const c2SPaymentProductContext = new C2SPaymentProductContext(_paymentDetails || paymentDetails);
      _c2sCommunicator.getPaymentProductGroup(paymentProductGroupId, c2SPaymentProductContext).then(
        (response) => {
          _paymentProductGroup = new PaymentProductGroup(response);
          promise.resolve(_paymentProductGroup);
        },
        (reason) => {
          _paymentProductGroup = null;
          promise.reject(reason);
        }
      );
      return promise;
    };

    this.getIinDetails = (partialCreditCardNumber: string, paymentDetails?: PaymentDetails | null): Promise<IinDetailsResponse> => {
      partialCreditCardNumber = partialCreditCardNumber.replace(/ /g, "");
      if (partialCreditCardNumber.length >= 8) {
        partialCreditCardNumber = partialCreditCardNumber.substring(0, 8);
      } else {
        partialCreditCardNumber = partialCreditCardNumber.substring(0, 6);
      }

      const c2SPaymentProductContext = new C2SPaymentProductContext(_paymentDetails || paymentDetails);
      return _c2sCommunicator.getPaymentProductIdByCreditCardNumber(partialCreditCardNumber, c2SPaymentProductContext);
    };

    this.getPublicKey = (): Promise<PublicKeyResponse> => {
      return _c2sCommunicator.getPublicKey();
    };

    this.getPaymentProductNetworks = (paymentProductId: number, paymentDetails: PaymentDetails): Promise<PaymentProductNetworksResponseJSON> => {
      const promise = new Promise<PaymentProductNetworksResponseJSON>();
      const c2SPaymentProductContext = new C2SPaymentProductContext(paymentDetails);
      _c2sCommunicator.getPaymentProductNetworks(paymentProductId, c2SPaymentProductContext).then(
        (response) => {
          _paymentDetails = paymentDetails;
          promise.resolve(response);
        },
        (reason) => {
          promise.reject(reason);
        }
      );
      return promise;
    };

    this.getPaymentProductDirectory = (paymentProductId: number, currencyCode: string, countryCode: string): Promise<DirectoryJSON> => {
      return _c2sCommunicator.getPaymentProductDirectory(paymentProductId, currencyCode, countryCode);
    };

    this.convertAmount = (amount: number, source: string, target: string): Promise<ConvertAmountJSON> => {
      return _c2sCommunicator.convertAmount(amount, source, target);
    };

    this.getPaymentRequest = (): PaymentRequest => {
      if (!_paymentRequest) {
        _paymentRequest = new PaymentRequest(_c2SCommunicatorConfiguration.clientSessionId);
      }
      return _paymentRequest;
    };

    this.getEncryptor = (): Encryptor => {
      const publicKeyResponsePromise = _c2sCommunicator.getPublicKey();
      return new Encryptor(publicKeyResponsePromise);
    };

    this.getThirdPartyPaymentStatus = (paymentId: string): Promise<ThirdPartyStatusResponseJSON> => {
      return _c2sCommunicator.getThirdPartyPaymentStatus(paymentId);
    };

    this.getCustomerDetails = (paymentProductId: number, paymentDetails: GetCustomerDetailsRequestJSON): Promise<GetCustomerDetailsResponseJSON> => {
      return _c2sCommunicator.getCustomerDetails(paymentProductId, paymentDetails);
    };

    this.createPaymentProductSession = (paymentProductId: number, paymentDetails: PaymentProductSessionContext): Promise<CreatePaymentProductSessionResponseJSON> => {
      return _c2sCommunicator.createPaymentProductSession(paymentProductId, paymentDetails);
    };

    this.createApplePayPayment = (context: PaymentDetails, paymentProductSpecificInput: ApplePaySpecificInput, networks: string[]): Promise<ApplePayInitResult> => {
      return _c2sCommunicator.initApplePayPayment(context, paymentProductSpecificInput, networks);
    };

    this.transformPaymentProductJSON = (json: PaymentProductJSON): PaymentProduct => {
      return new PaymentProduct(_c2sCommunicator.transformPaymentProductJSON(json));
    };

    this.transformPaymentProductGroupJSON = (json: PaymentProductGroupJSON): PaymentProductGroup => {
      return new PaymentProductGroup(_c2sCommunicator.transformPaymentProductJSON(json));
    };
  }
}

export = session;
