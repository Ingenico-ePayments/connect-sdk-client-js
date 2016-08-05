/**
 * This file contains helper functions for the example-app
 * This declutters the example app itself; refer to the helper docs below for usage
 */
$(function () {
	// declare a namespace in the window for references
	window.connect = window.connect || {};

	/**
	 * Add helpers for usage with handlebars. Use {@link connect@addHandleBarsHelpers} to setup the helpers
	 */
	connect.addHandleBarsHelpers = function () {
		// a handlebars helper that shows the needed Account on File properties
		Handlebars.registerHelper("showAoFProperties", function (items, options) {
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
		// - we assume that you use jQuery
		// - we assume that you have an element with the data attribute "data-aof-ppid" with the corresponding paymentproduct id
		// - the element has an image, the content of the src attribute are handled as postfix so you can use your own fixed width and height (if needed)
		// we need to do this this way since handlebars is a text based template and the paymentproduct call is async; it is also possible to do this before rendering the AoF data if you want to.
		Handlebars.registerHelper("getImageByProductId", function (items, options) {
			var that = this, id = items.fn();
			session.getPaymentProduct(id, paymentDetails).then(function (paymentProduct) {
				// The promise has fulfilled.
				var $target = $("[data-aof-ppid='" + id + "']").find("img");
				var imgUrl = paymentProduct.displayHints.logo + $target.attr("src");
				$target.attr("src", imgUrl);
			}, function () {
				// The promise failed, we just won;t show the image then
			});
		});
	};

	/**
	 * Adds non-simple validators. Use {@link connect#addValidators} to add the validators.
	 *
	 * @param {object} paymentItem - The paymentItem on which to bind the validations
	 */
	connect.addValidators = function (paymentItem) {

		// The payment product defines a set of data restrictions per field. We need to add functionality to
		// our pages. In our case we use jQuery validator as the library to actually do these validations.

		// We extend the default jQuery validator with additional methods that call the correct SDK validator.
		// The SDK offers validators per validation type (e.g. Luhn check, range check, etc). These extensions
		// below only need to call the correct validator with the value that was entered by the user.
		_addSimpleValidator("expirationDate", paymentItem, "Please enter a valid expiration date");
		_addSimpleValidator("emailAddress", paymentItem, "Please enter a valid email address");
		_addSimpleValidator("luhn", paymentItem, "Please enter a valid credit card number");
		_addSimpleValidator("regularExpression", paymentItem, "Please enter valid data");

		jQuery.validator.addMethod("allowedInContext", function (value, element, params) {
			if ($(element).hasClass('notAllowedInContext')) {
				return false;
			}
			return true;
		}, "This card is not allowed with this transaction");

		var lParams = null;
		jQuery.validator.addMethod("length", function (value, element, params) {
			var paymentProductField = paymentItem.paymentProductFieldById[element.id];
			if (paymentProductField) {
				var dataRestrictions = paymentProductField.dataRestrictions;
				var validation = dataRestrictions.validationRuleByType["length"];
				var unmaskedValue = paymentProductField.removeMask(value);
				// update params with the attributes
				lParams = [validation.minLength, validation.maxLength];
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
		jQuery.validator.addMethod("range", function (value, element, params) {
			var id = element.id;
			if (element.id.indexOf("-baseCurrencyUnit") !== -1 || element.id.indexOf("-centecimalCurrencyUnit") !== -1) {
				id = element.id.substring(0, element.id.indexOf("-"));
			}
			var paymentProductField = paymentItem.paymentProductFieldById[id];
			if (paymentProductField) {
				var dataRestrictions = paymentProductField.dataRestrictions;
				var validation = dataRestrictions.validationRuleByType["range"];
				var unmaskedValue = paymentProductField.removeMask(value);
				// update params with the attributes
				rParams = [validation.minValue, validation.maxValue];
				if (element.id.indexOf("-baseCurrencyUnit") !== -1 || element.id.indexOf("-centecimalCurrencyUnit") !== -1) {
					rParams = [Number(validation.minValue).toFixed(2), (Number(validation.maxValue) / 100).toFixed(2)];
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

		// we need a static non-sdk validator to trigger the 'is not allowed in context' validator
		$("#cardNumber").attr("data-rule-allowedInContext", true);
	};

	/**
	 * Update the masks in fields. Use {@link connect#updateFieldMask} to apply the mask to all visible fields
	 *
	 * @param {object} paymentItem - The paymentItem to apply masking to
	 */
	connect.updateFieldMask = function (paymentItem) {
		$("input").each(function () {
			// We look for the SDK mask that is defined on the payment product field. If it exists we add the formatter
			// logic to the field so any time the user changes the field's value the formatter nicely formats it.
			var paymentProductField = paymentItem.paymentProductFieldById[$(this).attr("id")];;

			if (paymentProductField) {
				var mask = paymentProductField.displayHints.mask;
				if (mask) {
					$(this).formatter({
						'pattern': mask
					});
				}
			}
		});
	};

	/**
	 * Updates the view of a paymentProduct. Use {@link connect#updatePaymentProduct} to update.
	 *
	 * @param {object} paymentProduct - The paymentProduct to use to update the view
	 */
	connect.updatePaymentProduct = function (paymentProduct) {
		// A - Update the logo
		if (paymentProduct.displayHints.logo) {
			$("#cardNumber").parent().find(".cc-image").html('<img src="' + paymentProduct.displayHints.logo + '">').show();
		}
		// B - Add new fields to the view
		_addFields(paymentProduct);
		// C - Remove unused fields from view
		_removeUnwantedFields(paymentProduct);
		// D - Update tooltips
		_updateAllTooltips(paymentProduct);
		// E - Update validators
		_updateAllValidators(paymentProduct);
	};

	/**
	 * Handles the support for cobrands. Use {@link connect@handleCobrands} to add support for cobrands to a paymentItem.
	 *
	 * @param {object} paymentItem - The paymentItem that could have cobrands
	 * @param {object} iinDetailsResponse - The response from the iinDetails.
	 * @param {object} paymentRequest - the request in which to update the paymentProduct if the user switches cobrand
	 * @param {object} session - the paymentSession which can be used to get new paymentItems
	 * @param {object} paymentDetails - the paymentContext used to determine which paymentItems can be used
	 */
	connect.handleCobrands = function (paymentItem, iinDetailsResponse, paymentRequest, session, paymentDetails) {
		if (iinDetailsResponse.coBrands && _numberOfCardsAllowedInContext(iinDetailsResponse.coBrands) > 1) {
			var source = $("#cobrands-template").html();
			var template = Handlebars.compile(source);
			var cobrands = {
				"coBrands": []
			};
			for (var i = 0; i < iinDetailsResponse.coBrands.length; i++) {
                if (iinDetailsResponse.coBrands[i].isAllowedInContext) {
                    session.getPaymentProduct(iinDetailsResponse.coBrands[i].paymentProductId, paymentDetails).then(function (paymentProduct) {
                        cobrands.coBrands.push(paymentProduct);
                        var domElement = template(cobrands);
                        $("#cobrandsHolder").html(domElement);
                        $("#cobrand").show();
                    });
                }
			}
			// cobrand events
			$("#cobrandsHolder").on("click", ".toggle-cobrand", function (e) {
				e.preventDefault();
				$("#cobrand .cobrand-wrapper").show();
				$(this).hide();
			});
			$("#cobrandsHolder").on("click", ".cobrand-close", function (e) {
				e.preventDefault();
				$("#cobrand .toggle-cobrand").show();
				$("#cobrand .cobrand-wrapper").hide();
			});
			$("#cobrandsHolder").on("click", ".btn-tertiary", function (e) {
				e.stopPropagation();
				var paymentProductId = $(this).data("payment-method");
				// set this new paymentproduct in the request
				session.getPaymentProduct(paymentProductId, paymentDetails).then(function (paymentProduct) {
					paymentRequest.setPaymentProduct(paymentProduct);
					$("#cobrand .toggle-cobrand").show();
					$("#cobrand .cobrand-wrapper").hide();

					// use this new paymentProduct to set-up the new view
					connect.updatePaymentProduct(paymentProduct);
				});
			});
		} else {
			$("#cobrandsHolder").off("click");
		}
	};
	/**
	 * Hides and reset the cobranding block on the page. Use {@link connect#hideCobranding} to use.
	 */
	connect.hideCobranding = function () {
		$("#cobrand").hide();
		$("#cobrand .toggle-cobrand").show();
		$("#cobrand .cobrand-wrapper").hide();
	};

	/**
	 * Private function that adds simple validation to a field
	 *
	 * @param {string} validationType - Type of validation to add.
	 * @param {object} paymentItem - Used paymentItem for this validation.
	 * @param {string} meesage - The message to display if validation fails.
	 */
	function _addSimpleValidator(validationType, paymentItem, message) {
		jQuery.validator.addMethod(validationType, function (value, element, params) {
			var paymentProductFieldId = element.id;
			var paymentProductField = paymentItem.paymentProductFieldById[paymentProductFieldId];
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
	};

	/**
	 * Private function that adds new fields to the view based on the paymentItem
	 *
	 * @param {object} paymentItem - the paymentItem that has the paymentFields.
	 */
	function _addFields(paymentItem) {
		var fields = paymentItem.paymentProductFields;
		var elementsInOrder = [];
		$.each(fields, function () {
			var field = this;
			if ($("#" + field.id).length === 0) {
				var source = $("#productfield-template").html();
				var template = Handlebars.compile(source);
				var domElement = template(field);
				elementsInOrder[field.displayHints.displayOrder] = $(domElement);
				// $("form .form-group:last").after(domElement);
			} else {
				elementsInOrder[field.displayHints.displayOrder] = $("#" + field.id).closest(".form-group").detach(); // remove from view
			}
		});
		$.each(elementsInOrder, function () {
			if (this) {
				$(".fields-holder").append(this);
			}
		});
        if (paymentItem.allowsTokenization && paymentItem.autoTokenized === false) {
            $("#rememberme").closest('.checkbox').show();
        }
		$("#cardNumber").focus();
	};

	/**
	 * Private function that removes unwanted fields from the view based on the paymentItem.
	 *
	 * @param {object} paymentItem - the paymentItem that has the paymentFields.
	 *
	 */
	function _removeUnwantedFields(paymentItem) {
		var fields = paymentItem.paymentProductFields;

		var visibleFields = $(".form-group[data-wrapper]");
		var newFields = [];
		$.each(visibleFields, function () {
			var id = $(this).data("wrapper");
			$.each(fields, function () {
				var field = this;
				if (id === field.id) {
					// found we store this one to keep
					newFields.push(id);
				}
			});
		});
		// now remove the fields we no longer see
		$.each(visibleFields, function () {
			var id = $(this).data("wrapper");
			if ($.inArray(id, newFields) === -1) {
				$(this).remove();
			}
		});
        if (!(paymentItem.allowsTokenization && paymentItem.autoTokenized === false)) {
            $("#rememberme").closest('.checkbox').hide();
        }
	};

	/**
	 * Private function that updates all tooltips and tooltip images in the view based on the paymentItem.
	 *
	 * @param {object} paymentItem - the paymentItem that has the updated tooltip(images).
	 */
	function _updateAllTooltips(paymentItem) {
		var fields = paymentItem.paymentProductFields;
		$.each(fields, function () {
			var field = this;
			if (field.displayHints && field.displayHints.tooltip) {
				var tooltipImage = field.displayHints.tooltip.image,
					tooltipText = field.displayHints.tooltip.label;
				$("#" + field.id + "-popover").attr("data-content", tooltipText + "<br /><img src='" + tooltipImage + "?size=210x140' width='210' height='140'>");
			}
		});
	};

	/**
	 * Private function that updates the validators associated to this paymentItem.
	 *
	 * @param {object} paymentItem - the paymentItem that has the updated validators.
	 */
	function _updateAllValidators(paymentItem) {
		connect.addValidators(paymentItem);
		var fields = paymentItem.paymentProductFields;
		$.each(fields, function () {
			var field = this;
			if (field.dataRestrictions && field.dataRestrictions.hasOwnProperty('isRequired')) {
				if (field.dataRestrictions.isRequired) {
					$("#" + field.id).attr("required", true);
				} else {
					$("#" + field.id).removeAttr("required");
				}
			}
			$("#" + field.id).rules("remove");
			$.each(field.dataRestrictions.validationRuleByType, function (key, value) {
				$("#" + field.id).data("rule-"+key, true);
			});
			if (field.id === "cardNumber") {
				// we need the allowedInContext validator for cradNumber fields
				$("#" + field.id).attr("data-rule-allowedInContext", true);
			}
		});
	};

	/**
	 * Private function to determine how many cards are allowedInContext
	 *
	 * @param {array} cobrands - list of cobrands to check
	 */
	function _numberOfCardsAllowedInContext(cobrands) {
		var allowed = 0;
		$.each(cobrands, function () {
			var cobrand = this;
			if (cobrand.isAllowedInContext) {
				allowed++;
			}
		});
		return allowed;
	};
});
