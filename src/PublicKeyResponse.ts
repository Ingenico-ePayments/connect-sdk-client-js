///<amd-module name="connectsdk.PublicKeyResponse"/>

import { PublicKeyJSON } from "./apimodel";

class PublicKeyResponse {
  readonly keyId: string;
  readonly publicKey: string;

  constructor(readonly json: PublicKeyJSON) {
    this.keyId = json.keyId;
    this.publicKey = json.publicKey;
  }
}

export = PublicKeyResponse;
