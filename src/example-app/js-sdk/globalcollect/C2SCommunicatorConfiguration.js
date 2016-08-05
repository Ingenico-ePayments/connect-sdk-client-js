define("GCsdk.C2SCommunicatorConfiguration", ["GCsdk.core"], function(GCsdk) {

    var C2SCommunicatorConfiguration = function (sessionDetails) {
        this.endpoints = {
                            PROD: {
                                EU: {
                                    API: "https://api-eu.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.poweredbyglobalcollect.com"
                                }
                                ,US: {
                                    API: "https://api-us.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.poweredbyglobalcollect.com"
                                }
                            }
                            ,PREPROD: {
                                EU: {
                                    API: "https://api-eu-preprod.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.preprod.poweredbyglobalcollect.com"
                                }
                                ,US: {
                                    API: "https://api-us-preprod.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.preprod.poweredbyglobalcollect.com"
                                }
                            }
                            ,SANDBOX: {
                                EU: {
                                    API: "https://api-eu-sandbox.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.sandbox.poweredbyglobalcollect.com"
                                }
                                ,US: {
                                    API: "https://api-us-sandbox.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.sandbox.poweredbyglobalcollect.com"
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
                            }
                            ,DEV_ISC: {
                                EU: {
                                    API: "http://api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "http://rpp.gc-dev.isaac.local"
                                }
                                ,US: {
                                    API: "http://api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "http://rpp.gc-dev.isaac.local"
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

    GCsdk.C2SCommunicatorConfiguration = C2SCommunicatorConfiguration;
    return C2SCommunicatorConfiguration;
});