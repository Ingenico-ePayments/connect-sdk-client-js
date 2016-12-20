define("connectsdk.C2SCommunicator", ["connectsdk.core", "connectsdk.promise", "connectsdk.net", "connectsdk.Util", "connectsdk.PublicKeyResponse", "connectsdk.IinDetailsResponse"], function (connectsdk, Promise, Net, Util, PublicKeyResponse, IinDetailsResponse) {
	var C2SCommunicator = function (c2SCommunicatorConfiguration, paymentProduct) {
		var _c2SCommunicatorConfiguration = c2SCommunicatorConfiguration;
		var _util = new Util();
		var _cache = {};
		var _providedPaymentProduct = paymentProduct;
		var that = this;
		var _removedPaymentProductIds = [302, 320];

		var _mapType = {
			"expirydate": "tel",
			"string": "text",
			"numericstring": "tel",
			"integer": "number",
			"expirationDate": "tel"
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
				if (field.displayHints.formElement.type === 'list') {
					field.displayHints.formElement.list = true;
				}

				// full image paths
				if (field.displayHints.tooltip && field.displayHints.tooltip.image) {
					field.displayHints.tooltip.image = url + "/" + field.displayHints.tooltip.image;
				}
			}
			// apply sortorder
			json.fields.sort(function (a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			// set full image path
			json.displayHints.logo = url + "/" + json.displayHints.logo;
			return json;
		};

		var _removeProducts = function (json) {
			for (var i = json.paymentProducts.length - 1, il = 0; i >= il; i--) {
				var product = json.paymentProducts[i];
				if (product && _removedPaymentProductIds.indexOf(product.id) > -1) {
					json.paymentProducts.splice(i, 1);
				}
			}
			return json;
		}

		var _extendLogoUrl = function (json, url, postfix) {
			for (var i = 0, il = json["paymentProduct" + postfix].length; i < il; i++) {
				var product = json["paymentProduct" + postfix][i];
				product.displayHints.logo = url + "/" + product.displayHints.logo;
			}
			json["paymentProduct" + postfix].sort(function (a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			return json;
		};

		var metadata = _util.getMetadata();

		this.getBasicPaymentProducts = function (context) {
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProducts-" + context.totalAmount + "_" + context.countryCode + "_"
					+ context.locale + "_" + context.isRecurring + "_" + context.currency;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
					+ "/products" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
					+ "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
					+ "&hide=fields&locale=" + context.locale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetsBaseUrl, "s");
							json = _removeProducts(json);
							_cache[cacheKey] = json;
							promise.resolve(json);
						} else {
							promise.reject();
						}
					});
			}
			return promise;
		};

		this.getBasicPaymentProductGroups = function (context) {
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProductGroups-" + context.totalAmount + "_" + context.countryCode + "_"
					+ context.locale + "_" + context.isRecurring + "_" + context.currency;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
					+ "/productgroups" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
					+ "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
					+ "&hide=fields&locale=" + context.locale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetsBaseUrl, "Groups");
							_cache[cacheKey] = json;
							promise.resolve(json);
						} else {
							promise.reject();
						}
					});
			}
			return promise;
		};

		this.getPaymentProduct = function (paymentProductId, context) {
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProduct-" + paymentProductId + "_" + context.totalAmount + "_"
					+ context.countryCode + "_" + "_" + context.locale + "_" + context.isRecurring + "_"
					+ context.currency;

			if (_removedPaymentProductIds.indexOf(paymentProductId) > -1) {
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
						var json = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetsBaseUrl);
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
					Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
						+ "/products/" + paymentProductId + "?countryCode=" + context.countryCode
						+ "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
						+ "&currencyCode=" + context.currency + "&locale=" + context.locale + "&cacheBust=" + cacheBust)
						.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
						.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
						.end(function (res) {
							if (res.success) {
								var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetsBaseUrl);
								_cache[cacheKey] = cleanedJSON;
								promise.resolve(cleanedJSON);
							} else {
								promise.reject(res);
							}
						});
				}
			}
			return promise;
		};

		this.getPaymentProductGroup = function (paymentProductGroupId, context) {
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProductGroup-" + paymentProductGroupId + "_" + context.totalAmount + "_"
					+ context.countryCode + "_" + "_" + context.locale + "_" + context.isRecurring + "_"
					+ context.currency;
			if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductGroupId) {
				if (_cache[cacheKey]) {
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					var json = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetsBaseUrl);
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
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
					+ "/productgroups/" + paymentProductGroupId + "?countryCode=" + context.countryCode
					+ "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
					+ "&currencyCode=" + context.currency + "&locale=" + context.locale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetsBaseUrl);
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
					Net.post(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/services/getIINdetails")
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
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/crypto/publickey")
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

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			var promise = new Promise()
				, cacheKey = "getPaymentProductDirectory-" + paymentProductId + "_" + currencyCode + "_" + countryCode;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/directory?countryCode=" + countryCode + "&currencyCode=" + currencyCode)
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
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/services/convert/amount?source=" + source + "&target=" + target + "&amount=" + amount)
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
	};


	connectsdk.C2SCommunicator = C2SCommunicator;
	return C2SCommunicator;
});