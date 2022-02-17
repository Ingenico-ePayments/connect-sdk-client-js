///<amd-module name="connectsdk.ValueMappingElement"/>

import { ValueMappingElementJSON } from "./apimodel";

class ValueMappingElement {
  readonly displayName?: string;
  readonly value: string;

  constructor(readonly json: ValueMappingElementJSON) {
    this.displayName = json.displayName;
    this.value = json.value;
  }
}

export = ValueMappingElement;
