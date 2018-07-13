define("connectsdk.C2SCommunicator", ["connectsdk.core", "connectsdk.promise", "connectsdk.net", "connectsdk.Util", "connectsdk.PublicKeyResponse", "connectsdk.PaymentProductPublicKeyResponse", "connectsdk.IinDetailsResponse", "connectsdk.AndroidPay"], function (connectsdk, Promise, Net, Util, PublicKeyResponse, PaymentProductPublicKeyResponse, IinDetailsResponse, AndroidPay) {
	var C2SCommunicator = function (c2SCommunicatorConfiguration, paymentProduct) {
		var _c2SCommunicatorConfiguration = c2SCommunicatorConfiguration;
		var _util = Util.getInstance();
		var _cache = {};
		var _providedPaymentProduct = paymentProduct;
		var that = this;
		var _AndroidPay = new AndroidPay(that);

		var _mapType = {
			"expirydate": "tel",
			"string": "text",
			"numericstring": "tel",
			"integer": "number",
			"expirationDate": "tel"
		};

		var formatUrl = function (url) {
			return (url && endsWith(url, '/')) ? url : url + '/';
		}

		var endsWith = function(string, suffix) {
			return string.indexOf(suffix, string.length - suffix.length) !== -1;
		};

		var _cleanJSON = function (json, url) {
			for (var i = 0, il = json.fields.length; i < il; i++) {
				var field = json.fields[i];
				field.type = (field.displayHints.obfuscate) ? "password" : _mapType[field.type];

				// helper code for templating tools like Handlebars
				for (validatorKey in field.dataRestrictions.validators) {
					field.validators = field.validators || [];
					field.validators.push(validatorKey);
				}
				if (field.displayHints.formElement && field.displayHints.formElement.type === 'list') {
					field.displayHints.formElement.list = true;
				}

				// full image paths
				if (field.displayHints.tooltip && field.displayHints.tooltip.image) {
					field.displayHints.tooltip.image = formatUrl(url) + field.displayHints.tooltip.image;
				}
			}
			// The server orders in a different way, so we apply the sortorder
			json.fields.sort(function (a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			// set full image path
			json.displayHints.logo = formatUrl(url) + json.displayHints.logo;
			return json;
		};

		var _extendLogoUrl = function (json, url, postfix) {
			for (var i = 0, il = json["paymentProduct" + postfix].length; i < il; i++) {
				var product = json["paymentProduct" + postfix][i];
				product.displayHints.logo = formatUrl(url) + product.displayHints.logo;
			}
			json["paymentProduct" + postfix].sort(function (a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			return json;
		};

		var _isPaymentProductInList = function (list, paymentProductId) {
			for (var i = list.length - 1, il = 0; i >= il; i--) {
				var product = list[i];
				if (product && (product.id === paymentProductId)) {
					return true;
				}
			}
			return false;
		}

		var metadata = _util.getMetadata();

		this.getBasicPaymentProducts = function (context, paymentProductSpecificInputs) {
			var cacheKeyLocale= context.locale ? context.locale + "_" : '';
			var paymentProductSpecificInputs = paymentProductSpecificInputs || {};
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProducts-" + context.totalAmount + "_" + context.countryCode + "_"
					+ cacheKeyLocale + context.isRecurring + "_" + context.currency + "_" + JSON.stringify(paymentProductSpecificInputs);

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var urlParameterLocale = context.locale ? "&locale=" + context.locale: '';
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/products" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
					+ "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
					+ "&hide=fields" + urlParameterLocale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetUrl, "s");
							if (_isPaymentProductInList(json.paymentProducts, _util.androidPayPaymentProductId)) {
								if (_AndroidPay.isMerchantIdProvided(paymentProductSpecificInputs)) {
									_AndroidPay.isAndroidPayAvailable(context, paymentProductSpecificInputs).then(function (isAndroidPayAvailable) {
										_util.filterOutProductsThatAreNotSupportedInThisBrowser(json);
										if (json.paymentProducts.length === 0) {
											promise.reject('No payment products available');
										}
										_cache[cacheKey] = json;
										promise.resolve(json);
									}, function () {
										_util.filterOutProductsThatAreNotSupportedInThisBrowser(json);
										if (json.paymentProducts.length === 0) {
											promise.reject('No payment products available');
										}
										_cache[cacheKey] = json;
										promise.resolve(json);
									});
								} else {
									//AndroidPay does not have merchantId
									_util.filterOutProductsThatAreNotSupportedInThisBrowser(json);
									console.warn('You have not provided a merchantId for Android Pay, you can set this in the paymentProductSpecificInputs object');
									promise.resolve(json);
								}
							} else {
								_util.filterOutProductsThatAreNotSupportedInThisBrowser(json);
								if (json.paymentProducts.length === 0) {
									promise.reject('No payment products available');
								}
								_cache[cacheKey] = json;
								promise.resolve(json);
							}
						} else {
							promise.reject('failed to retrieve Basic Payment Products', res);
						}
					});
			}
			return promise;
		};

		this.getBasicPaymentProductGroups = function (context) {
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProductGroups-" + context.totalAmount + "_" + context.countryCode + "_"
					+ cacheKeyLocale + context.isRecurring + "_" + context.currency;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var urlParameterLocale = context.locale ? "&locale=" + context.locale: '';
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/productgroups" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
					+ "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
					+ "&hide=fields" + urlParameterLocale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetUrl, "Groups");
							_cache[cacheKey] = json;
							promise.resolve(json);
						} else {
							promise.reject();
						}
					});
			}
			return promise;
		};

		this.getPaymentProduct = function (paymentProductId, context, paymentProductSpecificInputs) {
			var paymentProductSpecificInputs = paymentProductSpecificInputs || {};
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProduct-" + paymentProductId + "_" + context.totalAmount + "_"
					+ context.countryCode + "_" + cacheKeyLocale + context.isRecurring + "_"
					+ context.currency + "_" + JSON.stringify(paymentProductSpecificInputs);
			if (_util.paymentProductsThatAreNotSupportedInThisBrowser.indexOf(paymentProductId) > -1) {
				setTimeout(function () {
					promise.reject({
						"errorId": "48b78d2d-1b35-4f8b-92cb-57cc2638e901",
						"errors": [{
							"code": "1007",
							"propertyName": "productId",
							"message": "UNKNOWN_PRODUCT_ID",
							"httpStatusCode": 404
						}]
					});
				}, 0);
			} else {
				if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductId) {
					if (_cache[cacheKey]) {
						setTimeout(function () {
							promise.resolve(_cache[cacheKey]);
						}, 0);
					} else {
						var json = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetUrl);
						_cache[cacheKey] = json;
						setTimeout(function () {
							promise.resolve(_cache[cacheKey]);
						}, 0);
					}
				} else if (_cache[cacheKey]) {
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					var urlParameterlocale = context.locale ? "&locale=" + context.locale: '';
					var getPaymentProductUrl = formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
						+ "/products/" + paymentProductId + "?countryCode=" + context.countryCode
						+ "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
						+ "&currencyCode=" + context.currency + urlParameterlocale;

					if ((paymentProductId === _util.bancontactPaymentProductId) &&
					paymentProductSpecificInputs &&
					paymentProductSpecificInputs.bancontact &&
					paymentProductSpecificInputs.bancontact.forceBasicFlow) {
						// Add query parameter to products call to force basic flow for bancontact
						getPaymentProductUrl += "&forceBasicFlow=" + paymentProductSpecificInputs.bancontact.forceBasicFlow
					}

					getPaymentProductUrl += "&cacheBust=" + cacheBust;

					Net.get(getPaymentProductUrl)
						.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
						.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
						.end(function (res) {
							if (res.success) {
								var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetUrl);
								if (paymentProductId === _util.androidPayPaymentProductId) {
									if (_AndroidPay.isMerchantIdProvided(paymentProductSpecificInputs)) {
										_AndroidPay.isAndroidPayAvailable(context, paymentProductSpecificInputs).then(function (isAndroidPayAvailable) {
											if (isAndroidPayAvailable) {
												_cache[cacheKey] = cleanedJSON;
												promise.resolve(cleanedJSON);
											} else {
												_cache[cacheKey] = cleanedJSON;
												//_isAndroidPayAvailable returned false so android pay is not available, so reject getPaymentProduct
												promise.reject(cleanedJSON);
											}
										}, function () {
											_cache[cacheKey] = cleanedJSON;
											//_isAndroidPayAvailable rejected so not available
											promise.reject(cleanedJSON);
										});
									} else {
										_cache[cacheKey] = cleanedJSON;
										// merchantId is not provided so reject
										promise.reject(cleanedJSON);
									}
								} else {
									_cache[cacheKey] = cleanedJSON;
									promise.resolve(cleanedJSON);
								}
							} else {
								promise.reject('failed to retrieve Payment Product', res);
							}
						});
				}
			}
			return promise;
		};

		this.getPaymentProductGroup = function (paymentProductGroupId, context) {
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProductGroup-" + paymentProductGroupId + "_" + context.totalAmount + "_"
					+ context.countryCode + "_" + cacheKeyLocale + context.isRecurring + "_"
					+ context.currency;
			if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductGroupId) {
				if (_cache[cacheKey]) {
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					var json = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetUrl);
					_cache[cacheKey] = json;
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				}
			} else if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var urlParameterlocale = context.locale ? "&locale=" + context.locale: '';
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/productgroups/" + paymentProductGroupId + "?countryCode=" + context.countryCode
					+ "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
					+ "&currencyCode=" + context.currency + urlParameterlocale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetUrl);
							_cache[cacheKey] = cleanedJSON;
							promise.resolve(cleanedJSON);
						} else {
							promise.reject();
						}
					});
			}
			return promise;
		};

		this.getPaymentProductIdByCreditCardNumber = function (partialCreditCardNumber, context) {
			var promise = new Promise()
				, iinDetailsResponse = new IinDetailsResponse()
				, cacheKey = "getPaymentProductIdByCreditCardNumber-" + partialCreditCardNumber;

			var that = this;
			this.context = context;
			if (_cache[cacheKey]) {// cache is based on digit 1-6
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var isEnoughDigits = function (partialCreditCardNumber) {
					if (partialCreditCardNumber.length < 6) {
						return false;
					}
					return true;
				};
				if (isEnoughDigits(partialCreditCardNumber)) {
					Net.post(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/services/getIINdetails")
						.data(JSON.stringify(this.convertContextToIinDetailsContext(partialCreditCardNumber, this.context)))
						.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
						.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
						.end(function (res) {
							if (res.success) {
								iinDetailsResponse.json = res.responseJSON;
								iinDetailsResponse.countryCode = res.responseJSON.countryCode;
								iinDetailsResponse.paymentProductId = res.responseJSON.paymentProductId;
								iinDetailsResponse.isAllowedInContext = res.responseJSON.isAllowedInContext;
								iinDetailsResponse.coBrands = res.responseJSON.coBrands;
								// check if this card is supported
								// if isAllowedInContext is available in the response set status and resolve
								if (res.responseJSON.hasOwnProperty('isAllowedInContext')) {
									iinDetailsResponse.status = "SUPPORTED";
									if (iinDetailsResponse.isAllowedInContext === false) {
										iinDetailsResponse.status = "EXISTING_BUT_NOT_ALLOWED";
									}
									_cache[cacheKey] = iinDetailsResponse;
									promise.resolve(iinDetailsResponse);
								} else {
									//if isAllowedInContext is not available get the payment product again to determine status and resolve
									that.getPaymentProduct(iinDetailsResponse.paymentProductId, that.context).then(function (paymentProduct) {
										if (paymentProduct) {
											iinDetailsResponse.status = "SUPPORTED";
										} else {
											iinDetailsResponse.status = "UNSUPPORTED";
										}
										_cache[cacheKey] = iinDetailsResponse;
										promise.resolve(iinDetailsResponse);
									}, function () {
										iinDetailsResponse.status = "UNKNOWN";
										promise.reject(iinDetailsResponse);
									});
								}
							} else {
								iinDetailsResponse.status = "UNKNOWN";
								promise.reject(iinDetailsResponse);
							}
						});
				} else {
					iinDetailsResponse.status = "NOT_ENOUGH_DIGITS";
					setTimeout(function () {
						promise.resolve(iinDetailsResponse);
					}, 0);
				}
			}
			return promise;
		};

		this.convertContextToIinDetailsContext = function (partialCreditCardNumber, context) {
			return {
				"bin": partialCreditCardNumber,
				"paymentContext": {
					"countryCode": context.countryCode,
					"isRecurring": context.isRecurring,
					"amountOfMoney": {
						"amount": context.totalAmount,
						"currencyCode": context.currency
					}
				}
			}
		};

		this.getPublicKey = function () {
			var promise = new Promise()
				, cacheKey = "publicKey";

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/crypto/publickey")
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var publicKeyResponse = new PublicKeyResponse(res.responseJSON);
							_cache[cacheKey] = publicKeyResponse;
							promise.resolve(publicKeyResponse);
						} else {
							promise.reject("unable to get public key");
						}
					});
			}
			return promise;
		};

		this.getPaymentProductPublicKey = function (paymentProductId) {
			var promise = new Promise()
				, cacheKey = "paymentProductPublicKey";

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/publicKey")
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var paymentProductPublicKeyResponse = new PaymentProductPublicKeyResponse(res.responseJSON);
							_cache[cacheKey] = paymentProductPublicKeyResponse;
							promise.resolve(paymentProductPublicKeyResponse);
						} else {
							promise.reject("unable to get payment product public key");
						}
					});
			}
			return promise;
		}

		this.getPaymentProductNetworks = function (paymentProductId, context) {
			var promise = new Promise()
				, cacheKey = "paymentProductNetworks-" + paymentProductId + "_" + context.countryCode + "_" + context.currency + "_"
					+ context.totalAmount + "_" + context.isRecurring;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/products/" + paymentProductId + "/networks" + "?countryCode=" + context.countryCode + "&currencyCode=" + context.currency
					+ "&amount=" + context.totalAmount + "&isRecurring=" + context.isRecurring)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject();
						}
					});
			}
			return promise;
		};

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			var promise = new Promise()
				, cacheKey = "getPaymentProductDirectory-" + paymentProductId + "_" + currencyCode + "_" + countryCode;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/directory?countryCode=" + countryCode + "&currencyCode=" + currencyCode)
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject("unable to retrieve payment product directory");
						}
					});
			}
			return promise;
		};

		this.convertAmount = function (amount, source, target) {
			var promise = new Promise()
				, cacheKey = "convertAmount-" + amount + "_" + source + "_" + target;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/services/convert/amount?source=" + source + "&target=" + target + "&amount=" + amount)
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject("unable to convert amount");
						}
					});
			}
			return promise;
		};

		this.getThirdPartyPaymentStatus = function (paymentId) {
			var promise = new Promise();

			Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/payments/" + paymentId + "/thirdpartystatus")
				.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
				.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
				.end(function (res) {
					if (res.success) {
						promise.resolve(res.responseJSON);
					} else {
						promise.reject("unable to retrieve third party status");
					}
				});
			return promise;
		};

		this.getCustomerDetails = function(paymentProductId, context) {

			var promise = new Promise();
			var cacheKey = "getCustomerDetails_" + context.countryCode;
			cacheKey = constructCacheKeyFromKeyValues(cacheKey, context.values);
			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.post(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/customerDetails")
					.data(JSON.stringify(context))
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject(res.responseJSON);
						}
					});
			}
			return promise;
		};

		var constructCacheKeyFromKeyValues = function(prefix, values) {
			var cacheKey = prefix;
			for (var key in values){
				if (values.hasOwnProperty(key)) {
					cacheKey += "_" + values[key].key + "_" + values[key].value;
				}
			}
			return cacheKey;
		}
	};

	connectsdk.C2SCommunicator = C2SCommunicator;
	return C2SCommunicator;
});