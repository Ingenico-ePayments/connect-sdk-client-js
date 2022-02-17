///<amd-module name="connectsdk.ApplePay"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import Promise = require("./promise");
import Util = require("./Util");
import { CreatePaymentProductSessionResponseJSON } from "./apimodel";
import { ApplePayInitResult, ApplePayPaymentDetails, PaymentProductSessionContext } from "./types";

const util = Util.getInstance();

// This interface is used to break the circular import dependency between ApplePay and C2SCommunicator.
// C2SCommunicator automatically implements it.
interface ApplePayC2SCommunicator {
  createPaymentProductSession(paymentProductId: number, context: PaymentProductSessionContext): Promise<CreatePaymentProductSessionResponseJSON>;
}

class ApplePay {
  isApplePayAvailable(): boolean {
    const applePayIsAvailable = window["ApplePaySession"] && window["ApplePaySession"].canMakePayments();
    if (!applePayIsAvailable) {
      util.paymentProductsThatAreNotSupportedInThisBrowser.push(util.applePayPaymentProductId);
    }
    return !!applePayIsAvailable;
  }

  initPayment(context: ApplePayPaymentDetails, c2SCommunicator: ApplePayC2SCommunicator): Promise<ApplePayInitResult> {
    const promise = new Promise<ApplePayInitResult>();

    const countryCode = context.acquirerCountry ? context.acquirerCountry : context.countryCode;

    const payment: ApplePayJS.ApplePayPaymentRequest = {
      currencyCode: context.currency,
      countryCode: countryCode,
      total: {
        label: context.displayName,
        amount: (context.totalAmount / 100).toString(),
      },
      supportedNetworks: context.networks,
      merchantCapabilities: ["supports3DS"],
    };

    const applePaySession = new ApplePaySession(1, payment);
    applePaySession.begin();

    applePaySession.onvalidatemerchant = function (event: ApplePayJS.ApplePayValidateMerchantEvent): void {
      const sessionContext = {
        displayName: context.displayName,
        validationURL: event.validationURL,
        domainName: window.location.hostname,
      };
      c2SCommunicator.createPaymentProductSession(302, sessionContext).then(
        (merchantSession) => {
          try {
            applePaySession.completeMerchantValidation(JSON.parse(merchantSession.paymentProductSession302SpecificOutput!.sessionObject));
          } catch (e) {
            promise.reject(e);
            applePaySession.abort();
          }
        },
        (errorJSON) => {
          promise.reject(errorJSON);
          applePaySession.abort();
        }
      );
    };

    applePaySession.onpaymentauthorized = function (event: ApplePayJS.ApplePayPaymentAuthorizedEvent): void {
      if (!event.payment.token) {
        const status = ApplePaySession.STATUS_FAILURE;
        promise.reject({ message: "Error payment authorization" });
        applePaySession.completePayment(status);
      } else {
        const status = ApplePaySession.STATUS_SUCCESS;
        promise.resolve({ message: "Payment authorized", data: event.payment.token });
        applePaySession.completePayment(status);
      }
    };
    return promise;
  }
}

export = ApplePay;
