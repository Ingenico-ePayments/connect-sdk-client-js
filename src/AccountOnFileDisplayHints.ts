///<amd-module name="connectsdk.AccountOnFileDisplayHints"/>

import { AccountOnFileDisplayHintsJSON } from "./apimodel";
import LabelTemplateElement = require("./LabelTemplateElement");

function _parseJSON(
  _json: AccountOnFileDisplayHintsJSON,
  _labelTemplate: LabelTemplateElement[],
  _labelTemplateElementByAttributeKey: { [attributeKey: string]: LabelTemplateElement | undefined }
): void {
  if (_json.labelTemplate) {
    for (const element of _json.labelTemplate) {
      const labelTemplateElement = new LabelTemplateElement(element);
      _labelTemplate.push(labelTemplateElement);
      _labelTemplateElementByAttributeKey[labelTemplateElement.attributeKey] = labelTemplateElement;
    }
  }
}

class AccountOnFileDisplayHints {
  readonly logo: string;
  readonly labelTemplate: LabelTemplateElement[];
  readonly labelTemplateElementByAttributeKey: { [attributeKey: string]: LabelTemplateElement | undefined };

  constructor(readonly json: AccountOnFileDisplayHintsJSON) {
    this.logo = json.logo;
    this.labelTemplate = [];
    this.labelTemplateElementByAttributeKey = {};

    _parseJSON(json, this.labelTemplate, this.labelTemplateElementByAttributeKey);
  }
}

export = AccountOnFileDisplayHints;
