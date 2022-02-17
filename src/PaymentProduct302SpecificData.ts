///<amd-module name="connectsdk.PaymentProduct302SpecificData"/>

import { PaymentProduct302SpecificDataJSON } from "./apimodel";

class PaymentProduct302SpecificData {
  readonly networks: string[];

  constructor(readonly json: PaymentProduct302SpecificDataJSON) {
    this.networks = json.networks;
  }
}

export = PaymentProduct302SpecificData;
