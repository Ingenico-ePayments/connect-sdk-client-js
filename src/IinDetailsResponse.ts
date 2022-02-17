///<amd-module name="connectsdk.IinDetailsResponse"/>

import { ErrorResponseJSON, GetIINDetailsResponseJSON, IinDetailJSON } from "./apimodel";
import { IinDetailsStatus } from "./types";

class IinDetailsResponse {
  readonly countryCode?: string;
  readonly paymentProductId?: number;
  readonly isAllowedInContext?: boolean;
  readonly coBrands?: IinDetailJSON[];

  constructor(readonly status: IinDetailsStatus, readonly json?: GetIINDetailsResponseJSON | ErrorResponseJSON) {
    if (json) {
      // If the JSON is actually an ErrorResponseJSON, these properties don't exist and the fields will remain undefined
      json = json as GetIINDetailsResponseJSON;
      this.countryCode = json.countryCode;
      this.paymentProductId = json.paymentProductId;
      this.isAllowedInContext = json.isAllowedInContext;
      this.coBrands = json.coBrands;
    }
  }
}

export = IinDetailsResponse;
