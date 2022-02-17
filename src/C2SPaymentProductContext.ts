///<amd-module name="connectsdk.C2SPaymentProductContext"/>

import { PaymentDetails } from "./types";

class C2SPaymentProductContext {
  readonly totalAmount: number;
  readonly countryCode: string;
  readonly isRecurring: boolean;
  readonly currency: string;
  readonly locale?: string;
  readonly isInstallments: boolean;
  readonly accountOnFileId?: number;
  readonly environment?: string | "PROD";

  constructor(payload: PaymentDetails) {
    this.totalAmount = payload.totalAmount;
    this.countryCode = payload.countryCode;
    this.isRecurring = payload.isRecurring;
    this.currency = payload.currency;

    if (typeof payload.locale !== "undefined") {
      this.locale = payload.locale;
    }

    this.isInstallments = payload.isInstallments || false;

    if (typeof payload.accountOnFileId !== "undefined") {
      this.accountOnFileId = payload.accountOnFileId;
    }

    if (typeof payload.environment !== "undefined") {
      this.environment = payload.environment;
    }
  }
}

export = C2SPaymentProductContext;
