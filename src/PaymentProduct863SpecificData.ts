///<amd-module name="connectsdk.PaymentProduct863SpecificData"/>

import { PaymentProduct863SpecificDataJSON } from "./apimodel";

class PaymentProduct863SpecificData {
  readonly integrationTypes: string[];

  constructor(readonly json: PaymentProduct863SpecificDataJSON) {
    this.integrationTypes = json.integrationTypes;
  }
}

export = PaymentProduct863SpecificData;
