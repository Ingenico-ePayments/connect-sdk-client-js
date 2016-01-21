/**
 *  This file contains the JavaScript code that the example application uses to build its screens.
 *  Besides the GlobalCollect JavaScript SDK a couple of other libraries are used (see the list below).
 *  The SDK itself only depends on the forge library for encryption purposes. It does not depend on any
 *  of the other libaries that were used in this example application. These other libraries were chosen
 *  for their low complexity. You are of course free to build your payment pages using any JavaScript
 *  library. You can however also take this example application and build on top of it.
 *
 *  - forge (https://github.com/digitalbazaar/forge/)             A native implementation of TLS in Javascript and tools to write crypto-based and network-heavy webapps
 *  - Handlebars (http://handlebarsjs.com/).                      A simple templating framework
 *  - formatter.js (http://firstopinion.github.io/formatter.js/)  Format user input to match a specified pattern
 *  - jQuery validator (http://jqueryvalidation.org/)             A form validation jQuery plugin
 *  - Twitter bootstrap (http://getbootstrap.com/)                A CSS framework that also includes some JavaScript components that are used here
 *  - jQuery (http://jquery.com/)
 **/

$(function() {

	var startPayment = function(sessionDetails, paymentDetails) {


		// ====================================================== //
		// STEP 1: Initialize the JavaScript SDK for this payment //
		// ====================================================== //

		// Start by setting the clientSessionId, customerId and region for this transaction
		// in this example app the sessionDetails are stored in the HTML page for easy editing
		var session = new GCsdk.Session(sessionDetails);

		// Get the paymentRequest for this session. This is an SDK object that stores all the data
		// that the customer provided during the checkout. In the end of the checkout it will provide
		// all this information to the encryption function so that it can create the encrypted string
		// that contains all this info.
		var paymentRequest = session.getPaymentRequest();

		// We define some additional handlebarsHelpers. Because some of them also use the SDK
		// we need to provide the necessary info to use it.
		addHandleBarsHelpers();

		// Render the first page.
		renderPaymentProductSelection();


		// ======================================================================= //
		// STEP 2: Retrieve the payment products and accounts on file, build the   //
		// screen and set up the handlers.                                         //
		// ======================================================================= //
		function renderPaymentProductSelection() {
			$("#loading").show();

			// Get all paymentproducts for this paymentDetails using the SDK. This is an async task and we provide
			// you with a promise that you can handle when the response is returned to you. The SDK provides
			// its own implementatoin of promises so there is no dependancy to an external library. .
			// See http://www.html5rocks.com/en/tutorials/es6/promises/ for more information about promises.
			session.getPaymentProducts(paymentDetails).then(function(paymentProducts) {
				// The promise has fulfilled.

				$("#loading").hide();

				// Create view to show both account on file as well as all payment products.
				// If you use a MV* based framework you should handle this in the controller of the view.
				var view = {
					accountsOnFile : [],
					paymentProducts : []
				};

				// get all accountsonfile for all visible paymentproducts
				var aof = paymentProducts.accountsOnFile;

				// add these to the view object
				$.each(aof, function() {
					view.accountsOnFile.push(this.json);
				});

				// get all paymentproducts for the paymentDetails
				var products = paymentProducts.paymentProducts;

				// and add these to the view as well.
				$.each(products, function() {
					view.paymentProducts.push(this.json);
				});

				// build the handlebars template
				var source = $("#list-template").html();
				var template = Handlebars.compile(source);

				// and show it on the screen
				$("#handlebarsDrop").html(template(view));

				// Delegate a click on the list of paymentproducts to get the details of a single paymentproduct.
				// Note that we have included some code to handle history management as well. If you use a MVC based
				// framework this should be handled by the framework.
				$("body")
    				.off("click", "#paymentoptionslist a")
    				.on("click", "#paymentoptionslist a", function(e) {
    					e.preventDefault();

    					// Get the id of the clicked payment product or the ids of the clicked account on file and its
    					// associated payment product.
    					if ($(this).data("payment-method")) {
    						// the user clicked on a payment product
    						var id = $(this).data("payment-method");
    						var aofid = null;
    						var source = $("#detail-template").html();
    					} else {
    						// the user clicked on an account on file
    						var id = $(this).data("aof-ppid");
    						var aofid = $(this).data("aof-id");
    						var source = $("#aof-template").html();
    					}

    					renderPaymentProductDetails(id, aofid, source);
				    });

			}, function() {
				// The promise failed, inform the user what happened.

				$("#loading").hide();
				setDebugMessage("Unable to get data from the server, check your Client Session ID and consumer ID", "example.js", 117);
			});
		}

		// ======================================================================= //
		// STEP 3: Retrieve all the details about the payment product fields,      //
		// build the screen and set up the handlers.                               //
		// ======================================================================= //
		function renderPaymentProductDetails(id, aofid, source) {
			$("#loading").show();

			// get the paymentproduct details using the SDK, this is an async task that we provide you as a promise
			session.getPaymentProduct(id, paymentDetails).then(function(paymentProduct) {
				// The promise has fulfilled.

				$("#loading").hide();

				// Add the selected paymentproduct to the paymentRequest
				paymentRequest.setPaymentProduct(paymentProduct);

				var accountOnFile = isNaN(aofid)? null: paymentProduct.accountOnFileById[aofid];

				// append the accountonfile data if present
				if (accountOnFile) {
					paymentRequest.setAccountOnFile(accountOnFile);
				}

				// The payment product detail object contains all the fields that the user needs to fill out to continue
				// the payment. If there are no fields then we're done and can continue to encrypt the data.
				if (paymentProduct.paymentProductFields.length === 0) {
					encrypt();

				} else {
					// We have one or more fields that the customer must fill out.

					// In building the payment product detail page we need to do a couple of things:
					// 1) Generate the form HTML based on the Handlebars template
					// 2) Add validators to each of the fields in the form
					// 3) Add submit handling for when the user finishes filling out the form
					// 4) Add handlers for some additional bells and whisles (such as tooltips, IIN lookups, etc)


					// 1) Generate the HTML based on the Handlebars template
					var template = Handlebars.compile(source);
					var json = paymentProduct.json;

					// We now add some additional stuff to the JSON object that represents the selected payment product so handlebars
					// can actually fill out all the variables in its template. Some of these values for these variables are not
					// available in the core payment product info so we add them.
					$.each(json.fields, function (index, field) {
						// A) a isCurrency field because the #if Handlebars clause it too limited (it cannot do the === 'currency' check itself)
						if (field.displayHints.formElement.type === "currency") {
							field.displayHints.formElement.isCurrency = true;
						}

						// B) The paymentDetails so we can use its data in the field renderer; usefull for printing currency etc.
						field.paymentContext = paymentDetails;

						// C) In the case we have an account on file (AOF) we need to display the known values that
						// are defined for the fields that the AOF contains. We're adding these values to the fields
						if (accountOnFile) {
						    var relatedAofField = accountOnFile.attributeByKey[field.id];
						    if (relatedAofField) {
						        // Nice, the account on file has an existing value for this field. To signal to the handlebars template
						        // that this is the case we add a new field field.aofData that contains that known value. However: we want 
						        // to apply a mask to the known value before we show it. To do that we first retrieve the paymentProductField
						        // SDK object because it has the applyMask method. Note that we should not use the getMaskedValueByAttributeKey 
						        // method on the AccountOnFile object because that uses the maksing info that is provided in the 
						        // AccountOnFile displayHints object. That object is used to indictat which AoF fields should be shown 
						        // in the payment product selection list by inclusing only the masks for those fields. In our case we want
						        // to mask all known fields, so we fall back to the mask information in the paymentProductField object.
						        var paymentProductField = paymentProduct.paymentProductFieldById[field.id]; 
						        field.knownValue = paymentProductField.applyWildcardMask(relatedAofField.value).formattedValue;
						        
						        // We also determine if this field should be readonly. This depends on the status of the field
						        // as defined in the Account On File object. If the status is READ_ONLY it cannot be changed, but
						        // if the value is CAN_WRITE or even MUST_WRITE it's existing value can be overwritten.   
    					        field.isReadOnly = !relatedAofField.status || relatedAofField.status === 'READ_ONLY';
					        }
						}
						
						// D) Fields that are part of the aofData and that have the READ_ONLY status should be excluded from the 
						//    encrypted blob.
						field.includeInEncryptedBlob = field.isReadOnly === undefined || field.isReadOnly ? "false": "true";
					});
					
					// E) There's one field that we should add to the form that is not included in the payment product fields list for 
					// a payment product: the "remember me" option, aka : tokenization. It's only visible if the payment product 
					// itself allows it: allowsTokenization === true && autoTokenized === false.  (If autoTokenized === true it will 
					// get tokenized automatically by the server and we do not need to show the checkbox).
					json.showRememberMe = json.allowsTokenization === true && json.autoTokenized === false;

					// We have extended the JSON object that represents the payment product so that it contains
					// all the necessary information to fill in the Handlebars tenmplate. Now we generate the
					// HTML and add it to the DOM.
					$("#handlebarsDrop").html(template(json));

					// When clicking "cancel" the user returns to the payment ptoduct selections page.
					$(".cancel").on("click", function (e) {
						e.preventDefault();

						// go back to the paymentProductSelection page by rendering the cached pps html into the handlebars container
						renderPaymentProductSelection();
					});


					// 2) Add validators to each of the fields in the form

					// The payment product defines a set of data restrictions per field. We need to add functionality to
					// our pags. In our case we use jQuery validator as the library to actually do these validations.

					// We extend the default jQuery validator with additional methods that call the correct SDK validator.
					// The SDK offers validators per validation type (e.g. Luhn check, range check, etc). These extensions
					// below only need to call the correct validator with the value that was entered by the user.
					addSimpleValidator("expirationDate", paymentProduct, "Please enter a valid expiration date");
					addSimpleValidator("emailAddress", paymentProduct, "Please enter a valid email address");
					addSimpleValidator("luhn", paymentProduct, "Please enter a valid credit card number");
					addSimpleValidator("regularExpression", paymentProduct, "Please enter valid data");

					var lParams = null;
					jQuery.validator.addMethod("length", function(value, element, params) {
						var paymentProductField = paymentProduct.paymentProductFieldById[element.id];
						if (paymentProductField) {
							var dataRestrictions = paymentProductField.dataRestrictions;
							var validation = dataRestrictions.validationRuleByType["length"];
							var unmaskedValue = paymentProductField.removeMask(value);
							// update params with the attributes
							lParams=[validation.minLength,validation.maxLength];
							return this.optional(element) || validation.validate(unmaskedValue);
						} else {
							return true;
						}
					}, function () {
						if (lParams[0] === lParams[1]) {
                            return jQuery.validator.format("Please enter a value of length {0}", lParams[0]);
						} else {
                            return jQuery.validator.format("Please enter a valid length between {0} and {1}", lParams[0], lParams[1]);
						}
					});

					var rParams = [];
					jQuery.validator.addMethod("range", function(value, element, params) {
						var id = element.id;
						if (element.id.indexOf("-baseCurrencyUnit") !== -1 || element.id.indexOf("-centecimalCurrencyUnit") !== -1) {
							id = element.id.substring(0, element.id.indexOf("-"));
						}
						var paymentProductField = paymentProduct.paymentProductFieldById[id];
						if (paymentProductField) {
							var dataRestrictions = paymentProductField.dataRestrictions;
							var validation = dataRestrictions.validationRuleByType["range"];
							var unmaskedValue = paymentProductField.removeMask(value);
							// update params with the attributes
							rParams=[validation.minValue,validation.maxValue];
							if (element.id.indexOf("-baseCurrencyUnit") !== -1 || element.id.indexOf("-centecimalCurrencyUnit") !== -1) {
								rParams=[Number(validation.minValue).toFixed(2),(Number(validation.maxValue) / 100).toFixed(2)];
								// combine the field as one price and validate as cents
								var eur = $("#" + id + "-baseCurrencyUnit").val() * 100,
										cent = $("#" + id + "-centecimalCurrencyUnit").val() * 1,
										total = eur + cent;
								return this.optional(element) || validation.validate(total);
							}
							return this.optional(element) || validation.validate(unmaskedValue);
						} else {
							return true;
						}
					}, function () {
                        return jQuery.validator.format("Please enter a valid range between {0} and {1}", rParams[0], rParams[1]);
					});


					// 3) Add submit handling for when the user finishes filling out the form

					// After the customer is done filling out the form he submits it. But instead of sending the form to the server
					// we validate itand if successful we encrypt the result. Your application should send the cypher text to
					// your e-commerce server itself.
					$(".validatedForm").validate({
						submitHandler : function(e) {

							// We create an object with key:value pairs consisting on the id of the paymentproductfield
							// and its value as presented (with or without mask).
							var blob = {};

							// We only add the form elements that have the "data-includeInEncryptedBlob=true" attribute; which we've added
							// to each input/select when we created the form.
							$(".validatedForm [data-includeInEncryptedBlob=true]").each(function() {

								if ($(this).attr("id").indexOf("-baseCurrencyUnit") !== -1 || $(this).attr("id").indexOf("-centecimalCurrencyUnit") !== -1) {
									// The example application splits up currency fields into two fields: base currency and cents
									// We need to merge the values of these two fields again because the SDK only accepts one
									// value per field (and it expects the complete value in cents in this case)
									var id = $(this).attr("id").substring(0, $(this).attr("id").indexOf("-"));
									if ($(this).attr("id").indexOf("-baseCurrencyUnit") !== -1) {
										blob[id] = (blob[id]) ? (Number(blob[id]) + Number($(this).val() * 100)) + '' : Number($(this).val() * 100) + '';
									}
									if ($(this).attr("id").indexOf("-centecimalCurrencyUnit") !== -1) {
										blob[id] = (blob[id]) ? (Number(blob[id]) + Number($(this).val())) + '' : Number($(this).val()) + '';
									}

								} else {
									// In all other cases just us ethe entered value
									blob[$(this).attr("id")] = $(this).val();
								}
							});

							// Remmeber that we need to add all entered values to paymentRequest so they will be included in the
							// encryption later on.
							for (var key in blob) {
								paymentRequest.setValue(key, blob[key]);
							}

							// encrypt the paymentRequest
							encrypt();

							// Cancel submitting the form
							return false;
						}
					});


					// 4) Add handlers for some additional bells and whisles (such as tooltips, IIN lookups, etc)

					// A) Sometimes we show the "tokenize payment" checkbox (See above). Because of this special way of including the 
					//    field we also need a separate handling of it. That is done here.
					$("#rememberme").on("change", function() {
						paymentRequest.setTokenize($(this).is(":checked"));
					});

					// B) Some fields have tooltips (e.g. the CVV code field). We initialize the popups that contain those tooltips here.
					$('.info-popover').popover();

					// C) We mask the fields htat need masking as defined in the payment product field definitin. Either use use a jquery masked
					//    input plugin, or write your own. In this example we use jquery formatter plugin, which is included in this file at the
					//    bottom.
					$("input").each(function () {
						// We look for the SDK mask that is defined on the payment product field. If it exists we add the formatter
						// logic to the field so any time the user changes the field's value the formatter nicely formats it.
						var paymentProductField = paymentRequest.getPaymentProduct().paymentProductFieldById[$(this).attr("id")];
						if (paymentProductField) {
							var mask = paymentProductField.displayHints.mask;
							if (mask) {
								$(this).formatter({
									'pattern': mask
								});
							}
						}
					});

					// D) The creditcard field has an IIN lookup that determines the issuer of the card. It could be the case that the customer chose
					//    payment product VISA but entered a mastercard creditcard number. In that case the selected payment product should switch.
					$("#cardNumber").after('<span class="cc-image"></span>');
					$("#cardNumber").parent().find(".cc-image").html('<img src="' + paymentProduct.displayHints.logo + '">').show();
					$("#cardNumber").on("keyup", function() {
						// We ue the SDK to do the IIN lookup, this is an async task that we provide you as a promise
						session.getIinDetails($(this).val(), paymentDetails).then(function(response) {
							// The promise has fulfilled.

							// if this new creditcard is supported you can show the new logo in the helper element
							if (response.status === "SUPPORTED") {

								// Fetch the paymentproduct that belongs to the id the IIN returned, this is an async task that we provide you as a promise
								session.getPaymentProduct(response.paymentProductId, paymentDetails).then(function(paymentProduct) {
									// The promise has fulfilled.

									// update the paymentproduct in the request
									paymentRequest.setPaymentProduct(paymentProduct);

									// update the logo in the interface
									if (paymentProduct.displayHints.logo) {
										$("#cardNumber").parent().find(".cc-image").html('<img src="' + paymentProduct.displayHints.logo + '">').show();
									}

									// update the tooltips for all the fields that have one in the new payment product
									var fields = paymentProduct.paymentProductFields;
									$.each(fields, function () {
										var field = this;
										if (field.displayHints.tooltip && field.displayHints.tooltip) {
											var tooltipImage = field.displayHints.tooltip.image,
													tooltipText = field.displayHints.tooltip.label;
											$("#" + field.id + "-popover").attr("data-content", tooltipText+"<br /><img src='"+tooltipImage+"?size=210x140' width='210' height='140'>");
										}
									});
								});

							} else {
								// The creditcard number that the user provided did not map on any known or supported
								// (for this merchant) issuer. We decide to not change the payment product and simply
								// hide the payment poduct logo to indicate that it's unknown / unsupported.
								$("#cardNumber").parent().find(".cc-image").hide();
							}

						}, function(response) {
							// The promise failed, inform the user what happened.

							// The creditcard number that the user provided did not map on any known or supported
							// (for this merchant) issuer. We decide to not change the payment product and simply
							// hide the payment poduct logo to indicate that it's unknown / unsupported.
							$("#cardNumber").parent().find(".cc-image").hide();
						});
					});
				}

	        }, function() {
				// The promise failed, inform the user what happened.

				$("#loading").hide();
				setDebugMessage("unable to get data from the server, check your Client Session ID and consumer ID", "example.js", 397);
			});
		};

		// ======================================================================= //
		// STEP 4: Encrypt all the provided payment information                    //
		// ======================================================================= //
		function encrypt() {

			$("#loading").show();

			// Create an SDK encryptor object
			var encryptor = session.getEncryptor();

			// Encrypting is an async task that we provide you as a promise.
			encryptor.encrypt(paymentRequest).then(function(encryptedString) {
				// The promise has fulfilled.

				$("#loading").hide();

				// Now we have the encrypted string that you should send to your e-commerce server so your server
				// can provide it to GlobalCollect in a secure server-2-server call.
				// This example application simply displays the encrypted string on the screen.
				$("body").addClass("end");
				$("#main").html("<div class='alert alert-info'>EXAMPLE page</div><p>You can now send the encrypted data to GlobalCollect; please see the code in example.js</p>");
				setDebugMessage("paymentRequest has been encrypted to: " + encryptedString, 'example.js', 422, "INFO");

			}, function(errors) {
				// The promise failed, inform the user what happened.

				$("#loading").hide();
				setDebugMessage("Failed to encrypt due to " + JSON.stringify(errors), 'example.js', 428);
			});
		}

		/*
		 * Helper function that creates simple jQuery validation methods.
		 */
		function addSimpleValidator(validationType, paymentProduct, message) {
			jQuery.validator.addMethod(validationType, function(value, element, params) {
				var paymentProductFieldId = element.id;
				var paymentProductField = paymentProduct.paymentProductFieldById[paymentProductFieldId];
				// If there is no field associated with the id then we just assume there is no validation
				if (paymentProductField) {
					var dataRestrictions = paymentProductField.dataRestrictions;
					var validation = dataRestrictions.validationRuleByType[validationType];
					var unmaskedValue = paymentProductField.removeMask(value);
					return this.optional(element) || validation.validate(unmaskedValue);
				} else {
					return true;
				}
			}, message);
		}

		/*
		 * Helper method to add missing handlebar functionality
		 */
		function addHandleBarsHelpers() {

			// a handlebars helper that shows the needed Account on File properties
			Handlebars.registerHelper("showAoFProperties", function(items, options) {
				var that = this;
				var output = "";
				var accountOnFile = new GCsdk.AccountOnFile(that);
				var displayHints = accountOnFile.displayHints;

				for (var j = 0, jl = displayHints.labelTemplate.length; j < jl; j++) {
					var keyToShow = displayHints.labelTemplate[j].attributeKey;
					output = output + accountOnFile.getMaskedValueByAttributeKey(keyToShow).formattedValue + " ";
				}

				return output;
			});

			// a handlebars helper that shows the correct paymentproduct image for the given paymentproduct; please note:
			// - we asume that you use jQuery
			// - we asume that you have an element with the data attribute "data-aof-ppid" with the corrosponding paymentproduct id
			// - the element has an image, the content of the src attribute are handled as postfix so you can use your own fixed width and height (if needed)
			// we need to do this this way since handlebars is a text based template and the paymentproduct call is async; it is also possible to do this before rendering the AoF data if you want to.
			Handlebars.registerHelper("getImageByProductId", function(items, options) {
				var that = this, id = items.fn();
				session.getPaymentProduct(id, paymentDetails).then(function(paymentProduct) {
					// The promise has fulfilled.
					var $target = $("[data-aof-ppid='" + id + "']").find("img");
					var imgUrl = paymentProduct.displayHints.logo + $target.attr("src");
					$target.attr("src", imgUrl);
				}, function() {
					// The promise failed, we just won;t show the image then
				});
			});
		}
	};

	GCsdk.preparePayment = function (sessionDetails, paymentDetails) {
		// set data
		$(".demo").hide();
		$("#clientSessionId").val(sessionDetails.clientSessionID);
		$("#customerId").val(sessionDetails.customerId);
		$("#region").val(sessionDetails.region);
		$("#environment").val(sessionDetails.environment);

		$("#amountInCents").val(paymentDetails.totalAmount);
		$("#countryCode").val(paymentDetails.countryCode);
		$("#locale").val(paymentDetails.locale);
		$("#isRecurring").val(paymentDetails.isRecurring);
		$("#currency").val(paymentDetails.currency);

		$(".demo").show();
	};

	// after you have selected your sessionDetails and set the payment paymentDetails it's possible to start the session and to start the payment.
	// In a normal setting the settings below are pre-provided by you as a merchant.
	$("#startPayment").on("click", function(e) {
		e.preventDefault();
		var sd = jQuery.extend({}, sessionDetails, {
			"clientSessionID" : $("#clientSessionId").val(),
			"customerId" : $("#customerId").val(),
			"region" : $("#region").val(),
			"environment" : $("#environment").val()
		});

		// create a paymentDetails for getting payment option information; the options are based on:
		// - you as a merchant
		// - the amount (in cents!)
		// - the locale / country
		// - if the payment is recurring
		// - the currency of the payment
		var pd = jQuery.extend({}, paymentDetails, {
			"totalAmount" : $("#amountInCents").val(),
			"countryCode" : $("#countryCode").val(),
			"locale" : $("#locale").val(),
			"isRecurring" : $("#isRecurring").is(":checked"),
			"currency" : $("#currency").val()
		});
		startPayment(sd, pd);
	});

	// for helping you out to determine the various errors we capture ALL javascript errors
	var setDebugMessage = function(msg, url, line, type) {
		if (!type) {
			$("#debug div").html("<strong>An error occured</strong> <br />Error: " + msg + "<br />Line: " + line + "<br />Url: " + url).parent().show();
		} else {
			$("#debug div").html("<strong>" + type + "</strong> <br />Message: " + msg + "<br />Line: " + line + "<br />Url: " + url).parent().show();
		}
	};

	window.onerror = function(msg, url, line) {
		setDebugMessage(msg, url, line);
	};

	$("#debug .close").on("click", function() {
		$(this).parent().hide();
	});

	// the example shows a collapsible shoppingcart on mobile devices, the next lines of code toggles between the full view and the collapsed view
	// if you don't plan to use this you can remove this code.
	var $cart = $(".cart");
	$cart.on("click", ".header", function(e) {
		e.preventDefault();
		$cart.addClass("open");
	});
	$cart.on("click", "tfoot", function(e) {
		e.preventDefault();
		$cart.removeClass("open");
	});
});
