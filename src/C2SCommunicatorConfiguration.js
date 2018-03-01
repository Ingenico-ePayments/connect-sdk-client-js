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

        // clientSessionID, assetBaseUrl and apiBaseUrl are deprecated but still may be used. Here we check for presense of new variables, if they dont exist... Use the old variables.
        if (!sessionDetails.clientSessionId) {
            sessionDetails.clientSessionId = sessionDetails.clientSessionID;
        } else if (sessionDetails.clientSessionID) {
            throw new Error("You cannot use both the clientSessionId and the clientSessionID at the same time, please use the clientSessionId only.");
        }
        if (!sessionDetails.assetUrl) {
            sessionDetails.assetUrl = sessionDetails.assetsBaseUrl
        } else if (sessionDetails.assetsBaseUrl) {
            throw new Error("You cannot use both the assetUrl and the assetsBaseUrl at the same time, please use the assetUrl only.");
        }
        if (!sessionDetails.clientApiUrl) {
            sessionDetails.clientApiUrl = sessionDetails.apiBaseUrl
        } else if (sessionDetails.apiBaseUrl) {
            throw new Error("You cannot use both the clientApiUrl and the apiBaseUrl at the same time, please use the clientApiUrl only.");
        }

        this.clientSessionId = sessionDetails.clientSessionId;
        this.customerId = sessionDetails.customerId;

        // can be removed in a newer version of the SDK from this line
        if (sessionDetails.region && !sessionDetails.clientApiUrl) {
            // use regions; old stuff
            console.warn("Using regions is deprecated, switch to clientApiUrl");
            this.clientApiUrl = this.endpoints[sessionDetails.environment][sessionDetails.region].API;
            this.assetUrl = this.endpoints[sessionDetails.environment][sessionDetails.region].ASSETS;
        } else {
            // till this line; normal behaviour is below
            // ignore the region here
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
            var tester = this.clientApiUrl.split("/"); // [0] = (http(s): || "") , [1] = "", [2] = "host:port", [3+] = path
            if (tester[0] !== "" && tester[0].indexOf("http") !== 0) {
                throw new Error("A valid URL is required for the clientApiUrl, you provided '" + this.clientApiUrl + "'");
            }
            // if you cannot provide an URL that starts with (http(s)::)// and want an error: please provide a PR :)

            var path = tester.splice(3).join("/"); // the path (if no path; path = "").
            if (!path) { //If path == ""
                this.clientApiUrl += "/" + apiVersion;
            } else if (path === 'client') { //If path == client
                this.clientApiUrl += "/" + apiVersion.split('/')[1];
            } else if (path.indexOf(apiVersion) !== 0 || path.length !== apiVersion.length) {
                throw new Error("This version of the connectSDK is only compatible with " + apiVersion + ", you supplied: '" + path + "'");
            }
        }
    };
    connectsdk.C2SCommunicatorConfiguration = C2SCommunicatorConfiguration;
    return C2SCommunicatorConfiguration;
});