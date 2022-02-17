///<amd-module name="connectsdk.LabelTemplateElement"/>

import { LabelTemplateElementJSON } from "./apimodel";

class LabelTemplateElement {
  readonly attributeKey: string;
  readonly mask: string;
  readonly wildcardMask: string;

  constructor(readonly json: LabelTemplateElementJSON) {
    this.attributeKey = json.attributeKey;
    this.mask = json.mask;
    this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
  }
}

export = LabelTemplateElement;
