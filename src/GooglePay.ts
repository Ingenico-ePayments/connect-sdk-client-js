///<amd-module name="connectsdk.GooglePay"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import C2SPaymentProductContext = require("./C2SPaymentProductContext");
import Promise = require("./promise");
import Util = require("./Util");
import { PaymentProduct320SpecificDataJSON } from "./apimodel";
import { PaymentProductSpecificInputs } from "./types";

const util = Util.getInstance();

class GooglePay {
  readonly isGooglePayAvailable: (
    context: C2SPaymentProductContext,
    paymentProductSpecificInputs: PaymentProductSpecificInputs,
    googlePayData: PaymentProduct320SpecificDataJSON
  ) => Promise<boolean>;
  readonly isMerchantIdProvided: (paymentProductSpecificInputs?: PaymentProductSpecificInputs) => boolean;

  constructor() {
    let _paymentProductSpecificInputs: PaymentProductSpecificInputs = {};
    let _context: C2SPaymentProductContext;
    let _gateway = "";
    let _networks: google.payments.api.CardNetwork[] = [];
    let _paymentsClient: google.payments.api.PaymentsClient;

    // Only base is needed to trigger isReadyToPay
    function _getBaseCardPaymentMethod(): google.payments.api.IsReadyToPayPaymentMethodSpecification {
      return {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: _networks,
        },
      };
    }

    function _getTokenizationSpecification(): google.payments.api.PaymentGatewayTokenizationSpecification {
      return {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: _gateway,
          gatewayMerchantId: _paymentProductSpecificInputs.googlePay!.gatewayMerchantId,
        },
      };
    }

    // To prefetch payment data we need base + tokenizationSpecification
    function _getCardPaymentMethod(): google.payments.api.PaymentMethodSpecification {
      return Object.assign({}, _getBaseCardPaymentMethod(), {
        tokenizationSpecification: _getTokenizationSpecification(),
      });
    }

    function _getTransactionInfo(): google.payments.api.TransactionInfo {
      return {
        totalPriceStatus: "NOT_CURRENTLY_KNOWN",
        currencyCode: _context?.currency,
      } as google.payments.api.TransactionInfo;
      // Note that the cast is necessary, because the TypeScript definition makes totalPrice required even though it isn't
    }

    function _getMerchantInfo(): google.payments.api.MerchantInfo {
      return {
        merchantName: _paymentProductSpecificInputs.googlePay!.merchantName,
      } as google.payments.api.MerchantInfo;
      // Note that the cast is necessary, because the TypeScript definition makes merchantId required even though it isn't
    }

    function _getGooglePaymentDataRequest(): google.payments.api.IsReadyToPayRequest {
      return {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [_getBaseCardPaymentMethod()],
      };
    }

    function _getGooglePaymentDataRequestForPrefetch(): google.payments.api.PaymentDataRequest {
      // transactionInfo must be set but does not affect cache
      return {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [_getCardPaymentMethod()],
        transactionInfo: _getTransactionInfo(),
        merchantInfo: _getMerchantInfo(),
      };
    }

    function _getGooglePaymentsClient(): google.payments.api.PaymentsClient | undefined {
      if (typeof _paymentsClient === "undefined") {
        let googlePayEnvironment: google.payments.api.Environment = "TEST";
        if (_context!.environment === "PROD") {
          googlePayEnvironment = "PRODUCTION";
        }
        if (window.google) {
          _paymentsClient = new google.payments.api.PaymentsClient({ environment: googlePayEnvironment });
        } else {
          console.error("The Google Pay API script was not loaded https://developers.google.com/pay/api/web/guides/tutorial#js-load");
        }
      }
      return _paymentsClient;
    }

    /**
     * Prefetch payment data to improve performance
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
     */
    function _prefetchGooglePaymentData(): void {
      const paymentDataRequest = _getGooglePaymentDataRequestForPrefetch();

      const paymentsClient = _getGooglePaymentsClient()!;

      const googlePaySpecificInputs = _paymentProductSpecificInputs.googlePay!;
      // Prefetching is only effective when all information is provided
      if (googlePaySpecificInputs.gatewayMerchantId && googlePaySpecificInputs.merchantName) {
        paymentsClient.prefetchPaymentData(paymentDataRequest);
      } else {
        console.warn(
          "Prefetching payment data was not triggered because of missing information. " +
            "gatewayMerchantId: " +
            googlePaySpecificInputs.gatewayMerchantId +
            ", merchantName: " +
            googlePaySpecificInputs.merchantName
        );
      }
    }

    this.isGooglePayAvailable = (
      context: C2SPaymentProductContext,
      paymentProductSpecificInputs: PaymentProductSpecificInputs,
      googlePayData: PaymentProduct320SpecificDataJSON
    ): Promise<boolean> => {
      _context = context;
      _paymentProductSpecificInputs = paymentProductSpecificInputs;
      _gateway = googlePayData.gateway;
      _networks = googlePayData.networks as google.payments.api.CardNetwork[];

      if (_networks && _networks.length > 0) {
        const paymentsClient = _getGooglePaymentsClient();
        if (!paymentsClient) {
          util.paymentProductsThatAreNotSupportedInThisBrowser.push(util.googlePayPaymentProductId);
          return Promise.reject("The Google Pay API script was not loaded https://developers.google.com/pay/api/web/guides/tutorial#js-load");
        } else {
          const promise = new Promise<boolean>();
          paymentsClient
            .isReadyToPay(_getGooglePaymentDataRequest())
            .then((response) => {
              promise.resolve(response.result);
              _prefetchGooglePaymentData();
            })
            .catch((e) => {
              util.paymentProductsThatAreNotSupportedInThisBrowser.push(util.googlePayPaymentProductId);
              promise.reject(e);
            });
          return promise;
        }
      } else {
        util.paymentProductsThatAreNotSupportedInThisBrowser.push(util.googlePayPaymentProductId);
        return Promise.reject("There are no product networks available");
      }
    };

    this.isMerchantIdProvided = (paymentProductSpecificInputs?: PaymentProductSpecificInputs): boolean => {
      if (paymentProductSpecificInputs && paymentProductSpecificInputs.googlePay && paymentProductSpecificInputs.googlePay.merchantId) {
        return !!paymentProductSpecificInputs.googlePay.merchantId;
      } else {
        util.paymentProductsThatAreNotSupportedInThisBrowser.push(util.googlePayPaymentProductId);
        return false;
      }
    };
  }
}

export = GooglePay;
