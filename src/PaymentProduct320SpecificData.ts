///<amd-module name="connectsdk.PaymentProduct320SpecificData"/>

import { PaymentProduct320SpecificDataJSON } from "./apimodel";

class PaymentProduct320SpecificData {
  readonly gateway: string;
  readonly networks: string[];

  constructor(readonly json: PaymentProduct320SpecificDataJSON) {
    this.gateway = json.gateway;
    this.networks = json.networks;
  }
}

export = PaymentProduct320SpecificData;
