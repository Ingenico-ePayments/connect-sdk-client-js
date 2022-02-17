///<amd-module name="connectsdk.C2SCommunicator"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import ApplePay = require("./ApplePay");
import C2SCommunicatorConfiguration = require("./C2SCommunicatorConfiguration");
import C2SPaymentProductContext = require("./C2SPaymentProductContext");
import GooglePay = require("./GooglePay");
import IinDetailsResponse = require("./IinDetailsResponse");
import Net = require("./net");
import Promise = require("./promise");
import PublicKeyResponse = require("./PublicKeyResponse");
import Util = require("./Util");
import {
  BasicPaymentProductJSON,
  ConvertAmountJSON,
  CreatePaymentProductSessionRequestJSON,
  CreatePaymentProductSessionResponseJSON,
  DirectoryJSON,
  ErrorResponseJSON,
  GetCustomerDetailsRequestJSON,
  GetCustomerDetailsResponseJSON,
  GetIINDetailsRequestJSON,
  GetIINDetailsResponseJSON,
  KeyValuePairJSON,
  PaymentProduct320SpecificDataJSON,
  PaymentProductGroupJSON,
  PaymentProductGroupsJSON,
  PaymentProductJSON,
  PaymentProductNetworksResponseJSON,
  PaymentProductsJSON,
  PublicKeyJSON,
  ThirdPartyStatusResponseJSON,
} from "./apimodel";
import { ApplePayInitResult, ApplePayPaymentDetails, ApplePaySpecificInput, PaymentDetails, PaymentProductSessionContext, PaymentProductSpecificInputs } from "./types";

const util = Util.getInstance();

class C2SCommunicator {
  readonly getBasicPaymentProducts: (context: C2SPaymentProductContext, paymentProductSpecificInputs?: PaymentProductSpecificInputs) => Promise<PaymentProductsJSON>;
  readonly getBasicPaymentProductGroups: (context: C2SPaymentProductContext) => Promise<PaymentProductGroupsJSON>;
  readonly getPaymentProduct: (
    paymentProductId: number,
    context: C2SPaymentProductContext,
    paymentProductSpecificInputs?: PaymentProductSpecificInputs
  ) => Promise<PaymentProductJSON>;
  readonly getPaymentProductGroup: (paymentProductGroupId: string, context: C2SPaymentProductContext) => Promise<PaymentProductGroupJSON>;
  readonly getPaymentProductIdByCreditCardNumber: (partialCreditCardNumber: string, context: C2SPaymentProductContext) => Promise<IinDetailsResponse>;
  readonly convertContextToIinDetailsContext: (partialCreditCardNumber: string, context: C2SPaymentProductContext) => GetIINDetailsRequestJSON;
  readonly getPublicKey: () => Promise<PublicKeyResponse>;
  readonly getPaymentProductNetworks: (paymentProductId: number, context: C2SPaymentProductContext) => Promise<PaymentProductNetworksResponseJSON>;
  readonly getPaymentProductDirectory: (paymentProductId: number, currencyCode: string, countryCode: string) => Promise<DirectoryJSON>;
  readonly convertAmount: (amount: number, source: string, target: string) => Promise<ConvertAmountJSON>;
  readonly getThirdPartyPaymentStatus: (paymentId: string) => Promise<ThirdPartyStatusResponseJSON>;
  readonly getCustomerDetails: (paymentProductId: number, context: GetCustomerDetailsRequestJSON) => Promise<GetCustomerDetailsResponseJSON>;
  readonly createPaymentProductSession: (paymentProductId: number, context: PaymentProductSessionContext) => Promise<CreatePaymentProductSessionResponseJSON>;
  readonly initApplePayPayment: (context: PaymentDetails, paymentProductSpecificInput: ApplePaySpecificInput, networks: string[]) => Promise<ApplePayInitResult>;
  /* Transforms the JSON representation of a payment product (group) so it matches the result of getPaymentProduct and getPaymentProductGroup. */
  readonly transformPaymentProductJSON: <T extends PaymentProductJSON | PaymentProductGroupJSON>(json: T) => T;

  constructor(c2SCommunicatorConfiguration: C2SCommunicatorConfiguration, paymentProduct?: PaymentProductJSON | PaymentProductGroupJSON) {
    const _c2SCommunicatorConfiguration = c2SCommunicatorConfiguration;
    const _cache: { [cacheKey: string]: unknown } = {};
    const _providedPaymentProduct = paymentProduct;
    const _GooglePay = new GooglePay();
    const _ApplePay = new ApplePay();

    const _mapType = {
      expirydate: "tel",
      string: "text",
      numericstring: "tel",
      integer: "number",
      expirationDate: "tel",
    };

    function _startsWith(string: string, prefix: string): boolean {
      return string.indexOf(prefix) === 0;
    }

    function _endsWith(string: string, suffix: string): boolean {
      return string.indexOf(suffix, string.length - suffix.length) !== -1;
    }

    function _formatUrl(url: string): string {
      return url && _endsWith(url, "/") ? url : url + "/";
    }

    function _formatImageUrl(url: string, imageUrl: string): string {
      url = _formatUrl(url);
      // _cleanJSON can be called multiple times with the same data (which is cached between calls).
      // Don't prepend the url after the first time.
      if (_startsWith(imageUrl, url)) {
        return imageUrl;
      }
      return url + imageUrl;
    }

    function _constructUrl(path: string): string {
      return _formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + path;
    }

    function _constructUrlFromContext(path: string, context: C2SPaymentProductContext, includeLocale = true): string {
      const urlParameterLocale = includeLocale && context.locale ? "&locale=" + context.locale : "";
      return _constructUrl(
        path +
          "?countryCode=" +
          context.countryCode +
          "&isRecurring=" +
          context.isRecurring +
          "&amount=" +
          context.totalAmount +
          "&currencyCode=" +
          context.currency +
          urlParameterLocale
      );
    }

    function _constructCacheKeyFromContext(prefix: string, context: C2SPaymentProductContext, includeLocale = true): string {
      const cacheKeyLocale = includeLocale && context.locale ? context.locale + "_" : "";
      return prefix + context.totalAmount + "_" + context.countryCode + "_" + cacheKeyLocale + context.isRecurring + "_" + context.currency;
    }

    function _constructCacheKeyFromKeyValues(prefix: string, values: KeyValuePairJSON[]): string {
      let cacheKey = prefix;
      for (const key in values) {
        // eslint-disable-next-line no-prototype-builtins
        if (values.hasOwnProperty(key)) {
          cacheKey += "_" + values[key].key + "_" + values[key].value;
        }
      }
      return cacheKey;
    }

    function _cleanJSON<T extends PaymentProductJSON | PaymentProductGroupJSON>(json: T, url: string): T {
      for (const field of json.fields) {
        field.type = field.displayHints && field.displayHints.obfuscate ? "password" : _mapType[field.type];

        // helper code for templating tools like Handlebars
        for (const validatorKey in field.dataRestrictions.validators) {
          field.validators = field.validators || [];
          field.validators.push(validatorKey);
        }
        if (field.displayHints && field.displayHints.formElement && field.displayHints.formElement.type === "list") {
          field.displayHints.formElement.list = true;
        }

        // full image paths
        if (field.displayHints && field.displayHints.tooltip && field.displayHints.tooltip.image) {
          field.displayHints.tooltip.image = _formatImageUrl(url, field.displayHints.tooltip.image);
        }
      }
      // The server orders in a different way, so we apply the sortorder
      json.fields.sort((a, b) => {
        const aDisplayOrder = a.displayHints?.displayOrder ?? 0;
        const bDisplayOrder = b.displayHints?.displayOrder ?? 0;
        if (aDisplayOrder < bDisplayOrder) {
          return -1;
        }
        return 1;
      });
      // set full image path
      json.displayHints.logo = _formatImageUrl(url, json.displayHints.logo);
      if (json.accountsOnFile) {
        for (const aof of json.accountsOnFile) {
          aof.displayHints.logo = _formatImageUrl(url, aof.displayHints.logo);
        }
      }
      return json;
    }

    function _extendLogoUrl<T extends PaymentProductsJSON | PaymentProductGroupsJSON>(json: T, url: string, postfix: string): T {
      for (const product of json["paymentProduct" + postfix]) {
        product.displayHints.logo = _formatImageUrl(url, product.displayHints.logo);
        if (product.accountsOnFile) {
          for (const aof of product.accountsOnFile) {
            aof.displayHints.logo = _formatImageUrl(url, aof.displayHints.logo);
          }
        }
      }
      json["paymentProduct" + postfix].sort((a: PaymentProductJSON | PaymentProductGroupJSON, b: PaymentProductJSON | PaymentProductGroupJSON) => {
        if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
          return -1;
        }
        return 1;
      });
      return json;
    }

    function _isPaymentProductInList(list: BasicPaymentProductJSON[], paymentProductId: number): boolean {
      for (const product of list) {
        if (product && product.id === paymentProductId) {
          return true;
        }
      }
      return false;
    }

    function _getGooglePayData(list: BasicPaymentProductJSON[], paymentProductId: number): PaymentProduct320SpecificDataJSON | undefined {
      for (const product of list) {
        if (product && product.id === paymentProductId) {
          return product.paymentProduct320SpecificData;
        }
      }
      return undefined;
    }

    function _resolveGetBasicPaymentProducts(json: PaymentProductsJSON, promise: Promise<PaymentProductsJSON>, cacheKey: string): void {
      util.filterOutProductsThatAreNotSupportedInThisBrowser(json);
      _cache[cacheKey] = json;
      if (json.paymentProducts.length === 0) {
        promise.reject("No payment products available");
      } else {
        promise.resolve(json);
      }
    }

    this.getBasicPaymentProducts = (context: C2SPaymentProductContext, paymentProductSpecificInputs?: PaymentProductSpecificInputs): Promise<PaymentProductsJSON> => {
      paymentProductSpecificInputs = paymentProductSpecificInputs || {};

      const cacheBust = new Date().getTime();
      const cacheKey = _constructCacheKeyFromContext("getPaymentProducts-", context) + "_" + JSON.stringify(paymentProductSpecificInputs);

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as PaymentProductsJSON);
      } else {
        const promise = new Promise<PaymentProductsJSON>();
        const url = _constructUrlFromContext("/products", context) + "&hide=fields&cacheBust=" + cacheBust;
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              const json = _extendLogoUrl(res.responseJSON as PaymentProductsJSON, _c2SCommunicatorConfiguration.assetUrl, "s");
              if (_isPaymentProductInList(json.paymentProducts, util.applePayPaymentProductId)) {
                _ApplePay.isApplePayAvailable();
              }
              if (_isPaymentProductInList(json.paymentProducts, util.googlePayPaymentProductId) && _GooglePay.isMerchantIdProvided(paymentProductSpecificInputs)) {
                const googlePayData = _getGooglePayData(json.paymentProducts, util.googlePayPaymentProductId)!;
                _GooglePay.isGooglePayAvailable(context, paymentProductSpecificInputs!, googlePayData).then(
                  () => _resolveGetBasicPaymentProducts(json, promise, cacheKey),
                  () => _resolveGetBasicPaymentProducts(json, promise, cacheKey)
                );
              } else {
                _resolveGetBasicPaymentProducts(json, promise, cacheKey);
              }
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.getBasicPaymentProductGroups = (context: C2SPaymentProductContext): Promise<PaymentProductGroupsJSON> => {
      const cacheBust = new Date().getTime();
      const cacheKey = _constructCacheKeyFromContext("getPaymentProductGroups-", context);

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as PaymentProductGroupsJSON);
      } else {
        const promise = new Promise<PaymentProductGroupsJSON>();
        const url = _constructUrlFromContext("/productgroups", context) + "&hide=fields&cacheBust=" + cacheBust;
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              const json = _extendLogoUrl(res.responseJSON as PaymentProductGroupsJSON, _c2SCommunicatorConfiguration.assetUrl, "Groups");
              _cache[cacheKey] = json;
              promise.resolve(json);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.getPaymentProduct = (
      paymentProductId: number,
      context: C2SPaymentProductContext,
      paymentProductSpecificInputs?: PaymentProductSpecificInputs
    ): Promise<PaymentProductJSON> => {
      paymentProductSpecificInputs = paymentProductSpecificInputs || {};
      const cacheBust = new Date().getTime();
      const cacheKey = _constructCacheKeyFromContext("getPaymentProduct-" + paymentProductId, context) + "_" + JSON.stringify(paymentProductSpecificInputs);

      if (util.paymentProductsThatAreNotSupportedInThisBrowser.indexOf(paymentProductId) > -1) {
        return Promise.reject({
          errorId: "48b78d2d-1b35-4f8b-92cb-57cc2638e901",
          errors: [
            {
              code: "1007",
              propertyName: "productId",
              message: "UNKNOWN_PRODUCT_ID",
              httpStatusCode: 404,
            },
          ],
        });
      } else {
        if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductId) {
          if (!_cache[cacheKey]) {
            _cache[cacheKey] = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetUrl);
          }
          return Promise.resolve(_cache[cacheKey] as PaymentProductJSON);
        } else if (_cache[cacheKey]) {
          return Promise.resolve(_cache[cacheKey] as PaymentProductJSON);
        } else {
          const promise = new Promise<PaymentProductJSON>();
          let url = _constructUrlFromContext("/products/" + paymentProductId, context);
          if (
            paymentProductId === util.bancontactPaymentProductId &&
            paymentProductSpecificInputs &&
            paymentProductSpecificInputs.bancontact &&
            paymentProductSpecificInputs.bancontact.forceBasicFlow
          ) {
            // Add query parameter to products call to force basic flow for bancontact
            url += "&forceBasicFlow=" + paymentProductSpecificInputs.bancontact.forceBasicFlow;
          }
          url += "&cacheBust=" + cacheBust;

          const metadata = util.getMetadata();

          Net.get(url)
            .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
            .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
            .end((res) => {
              if (res.success) {
                const cleanedJSON = _cleanJSON(res.responseJSON as PaymentProductJSON, _c2SCommunicatorConfiguration.assetUrl);
                _cache[cacheKey] = cleanedJSON;
                if (paymentProductId === util.applePayPaymentProductId && !_ApplePay.isApplePayAvailable()) {
                  // Apple Pay is available in the payment context but the client does not support it.
                  promise.reject({
                    message: "Apple Pay is not available in the client",
                    json: cleanedJSON,
                  });
                } else if (paymentProductId === util.googlePayPaymentProductId && _GooglePay.isMerchantIdProvided(paymentProductSpecificInputs)) {
                  const googlePayData = cleanedJSON.paymentProduct320SpecificData;
                  _GooglePay.isGooglePayAvailable(context, paymentProductSpecificInputs!, googlePayData!).then(
                    (isGooglePayAvailable) => {
                      if (isGooglePayAvailable) {
                        promise.resolve(cleanedJSON);
                      } else {
                        // isGooglePayAvailable returned false so Google Pay is not available, so reject getPaymentProduct
                        promise.reject({
                          message: "Google Pay is not available in the client",
                          json: cleanedJSON,
                        });
                      }
                    },
                    (reason) => {
                      // isGooglePayAvailable rejected so not available
                      promise.reject({
                        reason: reason,
                        json: cleanedJSON,
                      });
                    }
                  );
                } else {
                  promise.resolve(cleanedJSON);
                }
              } else {
                promise.reject(res.responseJSON);
              }
            });
          return promise;
        }
      }
    };

    this.getPaymentProductGroup = (paymentProductGroupId: string, context: C2SPaymentProductContext): Promise<PaymentProductGroupJSON> => {
      const cacheBust = new Date().getTime();
      const cacheKey = _constructUrlFromContext("getPaymentProductGroup-" + paymentProductGroupId, context);

      if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductGroupId) {
        if (!_cache[cacheKey]) {
          _cache[cacheKey] = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetUrl);
        }
        return Promise.resolve(_cache[cacheKey] as PaymentProductGroupJSON);
      } else if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as PaymentProductGroupJSON);
      } else {
        const promise = new Promise<PaymentProductGroupJSON>();
        const url = _constructUrlFromContext("/productgroups/" + paymentProductGroupId, context) + "&cacheBust=" + cacheBust;
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              const cleanedJSON = _cleanJSON(res.responseJSON as PaymentProductGroupJSON, _c2SCommunicatorConfiguration.assetUrl);
              _cache[cacheKey] = cleanedJSON;
              promise.resolve(cleanedJSON);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.getPaymentProductIdByCreditCardNumber = (partialCreditCardNumber: string, context: C2SPaymentProductContext): Promise<IinDetailsResponse> => {
      const cacheKey = "getPaymentProductIdByCreditCardNumber-" + partialCreditCardNumber;

      if (_cache[cacheKey]) {
        // cache is based on digit 1-6
        return Promise.resolve(_cache[cacheKey] as IinDetailsResponse);
      } else {
        const isEnoughDigits = partialCreditCardNumber.length >= 6;
        if (isEnoughDigits) {
          const promise = new Promise<IinDetailsResponse>();
          const url = _constructUrl("/services/getIINdetails");
          const metadata = util.getMetadata();
          Net.post(url)
            .data(JSON.stringify(this.convertContextToIinDetailsContext(partialCreditCardNumber, context)))
            .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
            .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
            .end((res) => {
              if (res.success) {
                const json = res.responseJSON as GetIINDetailsResponseJSON;
                // check if this card is supported
                // if isAllowedInContext is available in the response set status and resolve
                // eslint-disable-next-line no-prototype-builtins
                if (json.hasOwnProperty("isAllowedInContext")) {
                  const status = json.isAllowedInContext !== false ? "SUPPORTED" : "EXISTING_BUT_NOT_ALLOWED";
                  const iinDetailsResponse = new IinDetailsResponse(status, json);
                  _cache[cacheKey] = iinDetailsResponse;
                  promise.resolve(iinDetailsResponse);
                } else {
                  //if isAllowedInContext is not available get the payment product again to determine status and resolve
                  this.getPaymentProduct(json.paymentProductId, context).then(
                    (paymentProduct) => {
                      const status = paymentProduct ? "SUPPORTED" : "UNSUPPORTED";
                      const iinDetailsResponse = new IinDetailsResponse(status, json);
                      _cache[cacheKey] = iinDetailsResponse;
                      promise.resolve(iinDetailsResponse);
                    },
                    () => {
                      const iinDetailsResponse = new IinDetailsResponse("UNKNOWN", json);
                      promise.reject(iinDetailsResponse);
                    }
                  );
                }
              } else {
                const iinDetailsResponse = new IinDetailsResponse("UNKNOWN", res.responseJSON as ErrorResponseJSON);
                promise.reject(iinDetailsResponse);
              }
            });
          return promise;
        } else {
          const iinDetailsResponse = new IinDetailsResponse("NOT_ENOUGH_DIGITS");
          return Promise.resolve(iinDetailsResponse);
        }
      }
    };

    this.convertContextToIinDetailsContext = (partialCreditCardNumber: string, context: C2SPaymentProductContext): GetIINDetailsRequestJSON => {
      const payload: GetIINDetailsRequestJSON = {
        bin: partialCreditCardNumber,
        paymentContext: {
          countryCode: context.countryCode,
          isRecurring: context.isRecurring,
          isInstallments: context.isInstallments,
          amountOfMoney: {
            amount: context.totalAmount,
            currencyCode: context.currency,
          },
        },
      };

      // Account on file id is needed only in case when the merchant
      // uses multiple payment platforms at the same time.
      if (typeof context.accountOnFileId !== "undefined") {
        payload["accountOnFileId"] = context.accountOnFileId;
      }

      return payload;
    };

    this.getPublicKey = (): Promise<PublicKeyResponse> => {
      const cacheKey = "publicKey";

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as PublicKeyResponse);
      } else {
        const promise = new Promise<PublicKeyResponse>();
        const url = _constructUrl("/crypto/publickey");
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              const publicKeyResponse = new PublicKeyResponse(res.responseJSON as PublicKeyJSON);
              _cache[cacheKey] = publicKeyResponse;
              promise.resolve(publicKeyResponse);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.getPaymentProductNetworks = (paymentProductId: number, context: C2SPaymentProductContext): Promise<PaymentProductNetworksResponseJSON> => {
      const cacheKey = _constructCacheKeyFromContext("paymentProductNetworks-" + paymentProductId, context, false);

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as PaymentProductNetworksResponseJSON);
      } else {
        const promise = new Promise<PaymentProductNetworksResponseJSON>();
        const url = _constructUrlFromContext("/products/" + paymentProductId + "/networks", context, false);
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              _cache[cacheKey] = res.responseJSON;
              promise.resolve(res.responseJSON as PaymentProductNetworksResponseJSON);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.getPaymentProductDirectory = (paymentProductId: number, currencyCode: string, countryCode: string): Promise<DirectoryJSON> => {
      const cacheKey = "getPaymentProductDirectory-" + paymentProductId + "_" + currencyCode + "_" + countryCode;

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as DirectoryJSON);
      } else {
        const promise = new Promise<DirectoryJSON>();
        const url = _constructUrl("/directory?countryCode=" + countryCode + "&currencyCode=" + currencyCode);
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              _cache[cacheKey] = res.responseJSON;
              promise.resolve(res.responseJSON as DirectoryJSON);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.convertAmount = (amount: number, source: string, target: string): Promise<ConvertAmountJSON> => {
      const cacheKey = "convertAmount-" + amount + "_" + source + "_" + target;

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as ConvertAmountJSON);
      } else {
        const promise = new Promise<ConvertAmountJSON>();
        const url = _constructUrl("/services/convert/amount?source=" + source + "&target=" + target + "&amount=" + amount);
        const metadata = util.getMetadata();
        Net.get(url)
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              _cache[cacheKey] = res.responseJSON;
              promise.resolve(res.responseJSON as ConvertAmountJSON);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.getThirdPartyPaymentStatus = (paymentId: string): Promise<ThirdPartyStatusResponseJSON> => {
      const promise = new Promise<ThirdPartyStatusResponseJSON>();

      const url = _constructUrl("/payments/" + paymentId + "/thirdpartystatus");
      const metadata = util.getMetadata();
      Net.get(url)
        .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
        .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
        .end((res) => {
          if (res.success) {
            promise.resolve(res.responseJSON as ThirdPartyStatusResponseJSON);
          } else {
            promise.reject(res.responseJSON);
          }
        });
      return promise;
    };

    this.getCustomerDetails = (paymentProductId: number, context: GetCustomerDetailsRequestJSON): Promise<GetCustomerDetailsResponseJSON> => {
      const cacheKey = _constructCacheKeyFromKeyValues("getCustomerDetails_" + paymentProductId + "_" + context.countryCode, context.values);

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as GetCustomerDetailsResponseJSON);
      } else {
        const promise = new Promise<GetCustomerDetailsResponseJSON>();
        const url = _constructUrl("/products/" + paymentProductId + "/customerDetails");
        const metadata = util.getMetadata();
        Net.post(url)
          .data(JSON.stringify(context))
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              _cache[cacheKey] = res.responseJSON;
              promise.resolve(res.responseJSON as GetCustomerDetailsResponseJSON);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.createPaymentProductSession = (paymentProductId: number, context: PaymentProductSessionContext): Promise<CreatePaymentProductSessionResponseJSON> => {
      const cacheKey = "createPaymentProductSession_" + paymentProductId + "_" + context.validationURL + "_" + context.domainName + "_" + context.displayName;

      if (_cache[cacheKey]) {
        return Promise.resolve(_cache[cacheKey] as CreatePaymentProductSessionResponseJSON);
      } else {
        const promise = new Promise<CreatePaymentProductSessionResponseJSON>();
        const url = _constructUrl("/products/" + paymentProductId + "/sessions");
        const requestParameters: CreatePaymentProductSessionRequestJSON = {
          paymentProductSession302SpecificInput: {
            validationUrl: context.validationURL,
            domainName: context.domainName,
            displayName: context.displayName,
          },
        };
        const metadata = util.getMetadata();
        Net.post(url)
          .data(JSON.stringify(requestParameters))
          .set("X-GCS-ClientMetaInfo", util.base64Encode(metadata))
          .set("Authorization", "GCS v1Client:" + _c2SCommunicatorConfiguration.clientSessionId)
          .end((res) => {
            if (res.success) {
              _cache[cacheKey] = res.responseJSON;
              promise.resolve(res.responseJSON as CreatePaymentProductSessionResponseJSON);
            } else {
              promise.reject(res.responseJSON);
            }
          });
        return promise;
      }
    };

    this.initApplePayPayment = (context: PaymentDetails, paymentProductSpecificInput: ApplePaySpecificInput, networks: string[]): Promise<ApplePayInitResult> => {
      const payload: ApplePayPaymentDetails = JSON.parse(JSON.stringify(context));
      payload.displayName = paymentProductSpecificInput.merchantName;
      if (paymentProductSpecificInput.acquirerCountry) {
        payload.acquirerCountry = paymentProductSpecificInput.acquirerCountry;
      }
      payload.networks = networks;

      return _ApplePay.initPayment(payload, this);
    };

    this.transformPaymentProductJSON = <T extends PaymentProductJSON | PaymentProductGroupJSON>(json: T): T => {
      return _cleanJSON(json, _c2SCommunicatorConfiguration.assetUrl);
    };
  }
}

export = C2SCommunicator;
