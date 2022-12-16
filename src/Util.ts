///<amd-module name="connectsdk.Util"/>

import { PaymentProductsJSON } from "./apimodel";
import { DeviceInformation, Metadata, Util } from "./types";

let instance: Util;

function createInstance(): Util {
  return {
    applePayPaymentProductId: 302,
    googlePayPaymentProductId: 320,
    bancontactPaymentProductId: 3012,
    paymentProductsThatAreNotSupportedInThisBrowser: [],
    getMetadata(): Metadata {
      return {
        screenSize: window.innerWidth + "x" + window.innerHeight,
        platformIdentifier: window.navigator.userAgent,
        sdkIdentifier: (document["GC"] && document["GC"].rppEnabledPage ? "rpp-" : "") + "JavaScriptClientSDK/v4.0.3",
        sdkCreator: "Ingenico",
      };
    },
    collectDeviceInformation(): DeviceInformation {
      return {
        timezoneOffsetUtcMinutes: new Date().getTimezoneOffset(),
        locale: navigator.language,
        browserData: {
          javaScriptEnabled: true,
          javaEnabled: navigator.javaEnabled(),
          colorDepth: screen.colorDepth,
          screenHeight: screen.height,
          screenWidth: screen.width,
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth,
        },
      };
    },
    base64Encode(data: object | string): string {
      if (typeof data === "object") {
        try {
          data = JSON.stringify(data);
        } catch (e) {
          throw "data must be either a String or a JSON object";
        }
      }

      if (!data) {
        return data;
      }

      const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      let i = 0;
      let ac = 0;
      const tmpArr: string[] = [];

      do {
        // pack three octets into four hexets
        const o1 = data.charCodeAt(i++);
        const o2 = data.charCodeAt(i++);
        const o3 = data.charCodeAt(i++);

        const bits = (o1 << 16) | (o2 << 8) | o3;

        const h1 = (bits >> 18) & 0x3f;
        const h2 = (bits >> 12) & 0x3f;
        const h3 = (bits >> 6) & 0x3f;
        const h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      const enc = tmpArr.join("");

      const r = data.length % 3;

      return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
    },
    filterOutProductsThatAreNotSupportedInThisBrowser(json: PaymentProductsJSON): void {
      for (let i = json.paymentProducts.length - 1, il = 0; i >= il; i--) {
        const product = json.paymentProducts[i];
        if (product && this.paymentProductsThatAreNotSupportedInThisBrowser.indexOf(product.id) > -1) {
          json.paymentProducts.splice(i, 1);
        }
      }
    },
  };
}

export = {
  getInstance(): Util {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  },
};
