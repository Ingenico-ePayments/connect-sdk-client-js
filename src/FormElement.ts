///<amd-module name="connectsdk.FormElement"/>

import { PaymentProductFieldFormElementJSON } from "./apimodel";
import ValueMappingElement = require("./ValueMappingElement");

function _parseJSON(_json: PaymentProductFieldFormElementJSON, _valueMapping: ValueMappingElement[]): void {
  if (_json.valueMapping) {
    for (const mapping of _json.valueMapping) {
      _valueMapping.push(new ValueMappingElement(mapping));
    }
  }
}

class FormElement {
  readonly type: string;
  readonly valueMapping: ValueMappingElement[];

  constructor(readonly json: PaymentProductFieldFormElementJSON) {
    this.type = json.type;
    this.valueMapping = [];

    _parseJSON(json, this.valueMapping);
  }
}

export = FormElement;
