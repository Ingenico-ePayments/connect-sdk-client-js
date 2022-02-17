///<amd-module name="connectsdk.Tooltip"/>

import { PaymentProductFieldTooltipJSON } from "./apimodel";

class Tooltip {
  readonly image: string;
  readonly label?: string;

  constructor(readonly json: PaymentProductFieldTooltipJSON) {
    this.image = json.image;
    this.label = json.label;
  }
}

export = Tooltip;
