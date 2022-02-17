///<amd-module name="connectsdk.C2SCommunicatorConfiguration"/>

import { SessionDetails } from "./types";

class C2SCommunicatorConfiguration {
  readonly clientSessionId: string;
  readonly customerId: string;
  readonly clientApiUrl: string;
  readonly assetUrl: string;

  constructor(sessionDetails: SessionDetails, apiVersion: string) {
    this.clientSessionId = sessionDetails.clientSessionId;
    this.customerId = sessionDetails.customerId;
    this.clientApiUrl = sessionDetails.clientApiUrl;
    this.assetUrl = sessionDetails.assetUrl;

    if (!this.clientApiUrl) {
      throw new Error("This version of the connectSDK requires an clientApiUrl, which you did not provide.");
    }
    if (!this.assetUrl) {
      throw new Error("This version of the connectSDK requires an assetUrl, which you did not provide.");
    }

    // now that the clientApiUrl is set check when if the api version is set in the URL, its the correct version break if not.
    if (this.clientApiUrl.indexOf("//") === -1) {
      throw new Error("A valid URL is required for the clientApiUrl, you provided '" + this.clientApiUrl + "'");
    }
    const tester = this.clientApiUrl.split("/"); // [0] = (http(s): || "") , [1] = "", [2] = "host:port", [3+] = path
    if (tester[0] !== "" && tester[0].indexOf("http") !== 0) {
      throw new Error("A valid URL is required for the clientApiUrl, you provided '" + this.clientApiUrl + "'");
    }
    // if you cannot provide an URL that starts with (http(s)::)// and want an error: please provide a PR :)

    const path = tester.splice(3).join("/"); // the path (if no path; path = "").
    if (!path) {
      this.clientApiUrl += "/" + apiVersion;
    } else if (path === "client") {
      this.clientApiUrl += "/" + apiVersion.split("/")[1];
    } else if (path.indexOf(apiVersion) !== 0 || path.length !== apiVersion.length) {
      throw new Error("This version of the connectSDK is only compatible with " + apiVersion + ", you supplied: '" + path + "'");
    }
  }
}

export = C2SCommunicatorConfiguration;
