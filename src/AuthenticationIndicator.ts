///<amd-module name="connectsdk.AuthenticationIndicator"/>

import { AuthenticationIndicatorJSON } from "./apimodel";

class AuthenticationIndicator {
  readonly name: string;
  readonly value: string;

  constructor(readonly json: AuthenticationIndicatorJSON) {
    this.name = json.name;
    this.value = json.value;
  }
}

export = AuthenticationIndicator;
