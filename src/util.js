define("connectsdk.Util", ["connectsdk.core"], function (connectsdk) {

	// Create a singleton from Util so the same util function can be used in different modules
	var Util = (function () {
		var instance;

		function createInstance() {
			// private variables to use in the public methods
			var applePayPaymentProductId = 302;
			var androidPayPaymentProductId = 320;
			var bancontactPaymentProductId = 3012;

			return {
				applePayPaymentProductId: applePayPaymentProductId,
				androidPayPaymentProductId: androidPayPaymentProductId,
				bancontactPaymentProductId: bancontactPaymentProductId,
				getMetadata: function () {
					return {
						screenSize: window.innerWidth + "x" + window.innerHeight,
						platformIdentifier: window.navigator.userAgent,
						sdkIdentifier: ((document.GC && document.GC.rppEnabledPage) ? 'rpp-' : '') + 'JavaScriptClientSDK/v${version}',
						sdkCreator: 'Ingenico'
					};
				},
				base64Encode: function (data) {
					if (typeof data === "object") {
						try {
							data = JSON.stringify(data);
						} catch (e) {
							throw "data must be either a String or a JSON object";
						}
					}

					var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
					var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];

					if (!data) {
						return data;
					}

					do {// pack three octets into four hexets
						o1 = data.charCodeAt(i++);
						o2 = data.charCodeAt(i++);
						o3 = data.charCodeAt(i++);

						bits = o1 << 16 | o2 << 8 | o3;

						h1 = bits >> 18 & 0x3f;
						h2 = bits >> 12 & 0x3f;
						h3 = bits >> 6 & 0x3f;
						h4 = bits & 0x3f;

						// use hexets to index into b64, and append result to encoded string
						tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
					} while (i < data.length);

					enc = tmp_arr.join('');

					var r = data.length % 3;

					return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
				},
				filterOutProductsThatAreNotSupportedInThisBrowser: function (json) {
					for (var i = json.paymentProducts.length - 1, il = 0; i >= il; i--) {
						var product = json.paymentProducts[i];
						if (product && this.paymentProductsThatAreNotSupportedInThisBrowser.indexOf(product.id) > -1) {
							json.paymentProducts.splice(i, 1);
						}
					}
				},
				paymentProductsThatAreNotSupportedInThisBrowser: [applePayPaymentProductId]
			}
		}

		return {
			getInstance: function () {
				if (!instance) {
					instance = createInstance();
				}
				return instance;
			}
		};
	})();

	connectsdk.Util = Util;
	return Util;
});