define("connectsdk.C2SCommunicatorConfiguration", ["connectsdk.core"], function(connectsdk) {

    var C2SCommunicatorConfiguration = function (sessionDetails) {
        this.endpoints = {
                            PROD: {
                                EU: {
                                    API: "https://ams1.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.secured-by-ingenico.com"
                                }
                                ,US: {
                                    API: "https://us.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.secured-by-ingenico.com"
                                }
                                ,AMS: {
                                    API: "https://ams2.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay3.secured-by-ingenico.com"
                                }
                                ,PAR: {
                                    API: "https://par.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay4.secured-by-ingenico.com"
                                }
                            }
                            ,PREPROD: {
                                EU: {
                                    API: "https://ams1.preprod.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.preprod.secured-by-ingenico.com"
                                }
                                ,US: {
                                    API: "https://us.preprod.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.preprod.secured-by-ingenico.com"
                                }
                                ,AMS: {
                                    API: "https://ams2.preprod.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay3.preprod.secured-by-ingenico.com"
                                }
                                ,PAR: {
                                    API: "https://par-preprod.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay4.preprod.secured-by-ingenico.com"
                                }
                            }
                            ,SANDBOX: {
                                EU: {
                                    API: "https://ams1.sandbox.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.sandbox.secured-by-ingenico.com"
                                }
                                ,US: {
                                    API: "https://us.sandbox.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.sandbox.secured-by-ingenico.com"
                                }
                                ,AMS: {
                                    API: "https://ams2.sandbox.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay3.sandbox.secured-by-ingenico.com"
                                }
                                ,PAR: {
                                    API: "https://par.sandbox.api-ingenico.com/client/v1"
                                    ,ASSETS: "https://assets.pay4.sandbox.secured-by-ingenico.com"
                                }
                            }

                            // Non public settings. Only needed in GC development environment. Do not use
                            // these, they will not work outside GC.
                            ,INTEGRATION: {
                                EU: {
                                    API: "https://int-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                                }
                                ,US: {
                                    API: "https://int-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                                }
                                ,AMS: {
                                    API: "https://int-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                                }
                                ,PAR: {
                                    API: "https://int-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                                }
                            }
                            ,DEV_NAMI: {
                                EU: {
                                    API: "https://nami-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                                }
                                ,US: {
                                    API: "https://nami-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                                }
                                ,AMS: {
                                    API: "https://nami-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                                }
                                ,PAR: {
                                    API: "https://nami-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                                }
                            }
                            ,DEV_ISC: {
                                EU: {
                                    API: "//api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "//rpp.gc-dev.isaac.local"
                                }
                                ,US: {
                                    API: "//api.gc-ci-dev.isaac.local/client/v1"
                                    ,ASSETS: "//rpp.gc-ci-dev.isaac.local"
                                }
                                ,AMS: {
                                    API: "//api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "//rpp.gc-dev.isaac.local"
                                }
                                ,PAR: {
                                    API: "//api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "//rpp.gc-dev.isaac.local"
                                }
                            }
                        };

        this.region = sessionDetails.region;
        this.environment = sessionDetails.environment || 'RPP'; // in case this is used in the RPP; the RPP will override the endpoints; by using the apiBaseUrl
        this.clientSessionId = sessionDetails.clientSessionID;
        this.customerId = sessionDetails.customerId;
        this.apiBaseUrl = (sessionDetails.apiBaseUrl || sessionDetails.apiBaseUrl === '') ? sessionDetails.apiBaseUrl : this.endpoints[this.environment][this.region].API;
        this.assetsBaseUrl = (sessionDetails.assetsBaseUrl || sessionDetails.assetsBaseUrl === '' ) ? sessionDetails.assetsBaseUrl : this.endpoints[this.environment][this.region].ASSETS;
    };

    connectsdk.C2SCommunicatorConfiguration = C2SCommunicatorConfiguration;
    return C2SCommunicatorConfiguration;
});