///<amd-module name="connectsdk.Attribute"/>

import { AccountOnFileAttributeJSON } from "./apimodel";

class Attribute {
  readonly key: string;
  readonly value: string;
  readonly status: string;
  readonly mustWriteReason?: string;

  constructor(readonly json: AccountOnFileAttributeJSON) {
    this.key = json.key;
    this.value = json.value;
    this.status = json.status;
    this.mustWriteReason = json.mustWriteReason;
  }
}

export = Attribute;
