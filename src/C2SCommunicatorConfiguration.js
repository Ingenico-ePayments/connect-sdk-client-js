define("connectsdk.C2SCommunicatorConfiguration", ["connectsdk.core"], function (connectsdk) {

    var C2SCommunicatorConfiguration = function (sessionDetails, apiVersion) {
        this.endpoints = {
            PROD: {
                EU: {
                    API: "https://ams1.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay1.secured-by-ingenico.com"
                },
                US: {
                    API: "https://us.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay2.secured-by-ingenico.com"
                },
                AMS: {
                    API: "https://ams2.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay3.secured-by-ingenico.com"
                },
                PAR: {
                    API: "https://par.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay4.secured-by-ingenico.com"
                }
            },
            PREPROD: {
                EU: {
                    API: "https://ams1.preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay1.preprod.secured-by-ingenico.com"
                },
                US: {
                    API: "https://us.preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay2.preprod.secured-by-ingenico.com"
                },
                AMS: {
                    API: "https://ams2.preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay3.preprod.secured-by-ingenico.com"
                },
                PAR: {
                    API: "https://par-preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay4.preprod.secured-by-ingenico.com"
                }
            },
            SANDBOX: {
                EU: {
                    API: "https://ams1.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay1.sandbox.secured-by-ingenico.com"
                },
                US: {
                    API: "https://us.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay2.sandbox.secured-by-ingenico.com"
                },
                AMS: {
                    API: "https://ams2.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay3.sandbox.secured-by-ingenico.com"
                },
                PAR: {
                    API: "https://par.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay4.sandbox.secured-by-ingenico.com"
                }
            }

            // Non public settings. Only needed in GC development environment. Do not use
            // these, they will not work outside GC.
            ,
            INTEGRATION: {
                EU: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                },
                US: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                },
                AMS: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                },
                PAR: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                }
            },
            DEV_NAMI: {
                EU: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                },
                US: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                },
                AMS: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                },
                PAR: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                }
            },
            DEV_ISC: {
                EU: {
                    API: "//api.gc-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-dev.isaac.local"
                },
                US: {
                    API: "//api.gc-ci-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-ci-dev.isaac.local"
                },
                AMS: {
                    API: "//api.gc-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-dev.isaac.local"
                },
                PAR: {
                    API: "//api.gc-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-dev.isaac.local"
                }
            }
        };

        this.clientSessionId = sessionDetails.clientSessionID;
        this.customerId = sessionDetails.customerId;

        // can be removed in a newer version of the SDK from this line
        if (sessionDetails.region && !sessionDetails.apiBaseUrl) {
            // use regions; old stuff
            console.warn("Using regions is deprecated, switch to apiBaseUrl");
            this.apiBaseUrl = this.endpoints[this.environment][sessionDetails.region].API;
            this.assetsBaseUrl = this.endpoints[this.environment][sessionDetails.region].ASSETS;
        } else if (sessionDetails.region && sessionDetails.apiBaseUrl) {
            // using both is not allowed
            throw new Error("You cannot use both the apiBaseUrl and the region at the same time, please use the apiBaseUrl only.");
        } else {
            // till this line; normal behaviour is below
            this.apiBaseUrl = sessionDetails.apiBaseUrl;
            this.assetsBaseUrl = sessionDetails.assetsBaseUrl;
            if (!this.apiBaseUrl) {
                throw new Error("This version of the connectSDK requires an apiBaseUrl, which you did not provide.");
            }
            if (!this.assetsBaseUrl) {
                throw new Error("This version of the connectSDK requires an assetsBaseUrl, which you did not provide.");
            }

            // now that the apiBaseUrl is set check when if the api version is set in the URL, its the correct version break if not.
            if (this.apiBaseUrl.indexOf("//") === -1) {
                throw new Error("A valid URL is required for the apiBaseUrl, you provided '" + this.apiBaseUrl + "'");
            }
            var tester = this.apiBaseUrl.split("/"); // [0] = (http(s): || "") , [1] = "", [2] = "host:port", [3+] = path
            if (tester[0] !== "" && tester[0].indexOf("http") !== 0) {
                throw new Error("A valid URL is required for the apiBaseUrl, you provided '" + this.apiBaseUrl + "'");
            }
            // if you cannot provide an URL that starts with (http(s)::)// and want an error: please provide a PR :)

            var path = tester.splice(3).join("/"); // the path (if no path; path = "").
            if (!path) {
                this.apiBaseUrl += "/" + apiVersion;
            } else if (path.indexOf(apiVersion) !== 0 || path.length !== apiVersion.length) {
                throw new Error("This version of the connectSDK is only compatible with " + apiVersion + ", you supplied: '" + path + "'");
            }
        }
    };
    connectsdk.C2SCommunicatorConfiguration = C2SCommunicatorConfiguration;
    return C2SCommunicatorConfiguration;
});