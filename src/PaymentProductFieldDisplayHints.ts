///<amd-module name="connectsdk.PaymentProductFieldDisplayHints"/>

import { PaymentProductFieldDisplayHintsJSON } from "./apimodel";
import FormElement = require("./FormElement");
import Tooltip = require("./Tooltip");

class PaymentProductFieldDisplayHints {
  readonly displayOrder: number;
  readonly formElement?: FormElement;
  readonly label?: string;
  readonly mask?: string;
  readonly obfuscate: boolean;
  readonly placeholderLabel?: string;
  readonly preferredInputType?: string;
  readonly tooltip?: Tooltip;
  readonly alwaysShow: boolean;
  readonly wildcardMask: string;

  constructor(readonly json: PaymentProductFieldDisplayHintsJSON) {
    this.displayOrder = json.displayOrder;
    if (json.formElement) {
      this.formElement = new FormElement(json.formElement);
    }
    this.label = json.label;
    this.mask = json.mask;
    this.obfuscate = json.obfuscate;
    this.placeholderLabel = json.placeholderLabel;
    this.preferredInputType = json.preferredInputType;
    this.tooltip = json.tooltip ? new Tooltip(json.tooltip) : undefined;
    this.alwaysShow = json.alwaysShow;
    this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
  }
}

export = PaymentProductFieldDisplayHints;
