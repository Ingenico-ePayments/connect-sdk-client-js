/**
 *  This file contains the JavaScript code that the example application uses to build its screens.
 *  Besides the Connect JavaScript SDK a couple of other libraries are used (see the list below).
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

$(function () {

    var startPayment = function (sessionDetails, paymentDetails) {


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
        connect.addHandleBarsHelpers();

        // Render the first page.
        renderPaymentProductSelection();


        // ======================================================================= //
        // STEP 2: Retrieve the payment items and accounts on file, build the   //
        // screen and set up the handlers.                                         //
        // ======================================================================= //
        function renderPaymentProductSelection() {
            $("#loading").show();

            // Get all paymentitems for this paymentDetails using the SDK. This is an async task and we provide
            // you with a promise that you can handle when the response is returned to you. The SDK provides
            // its own implementation of promises so there is no dependency to an external library. .
            // See http://www.html5rocks.com/en/tutorials/es6/promises/ for more information about promises.
            session.getBasicPaymentItems(paymentDetails, true).then(function (basicPaymentItems) {
                // The promise has fulfilled.

                $("#loading").hide();

                // Create view to show both account on file as well as all payment items.
                // If you use a MV* based framework you should handle this in the controller of the view.
                var view = {
                    accountsOnFile: [],
                    paymentItems: []
                };

                // get all accountsonfile for all visible paymentitems
                var aof = basicPaymentItems.accountsOnFile;

                // add these to the view object
                $.each(aof, function () {
                    view.accountsOnFile.push(this.json);
                });

                // get all paymentitems for the paymentDetails
                var items = basicPaymentItems.basicPaymentItems;

                // and add these to the view as well.
                $.each(items, function () {
                    view.paymentItems.push(this.json);
                });

                // build the handlebars template
                var source = $("#list-template").html();
                var template = Handlebars.compile(source);

                // and show it on the screen
                $("#handlebarsDrop").html(template(view));

                // Delegate a click on the list of paymentitems to get the details of a single paymentitem.
                // Note that we have included some code to handle history management as well. If you use a MVC based
                // framework this should be handled by the framework.
                $("body")
                    .off("click", "#paymentoptionslist a")
                    .on("click", "#paymentoptionslist a", function (e) {
                        e.preventDefault();

                        // Get the id of the clicked payment item or the ids of the clicked account on file and its
                        // associated payment item.
                        var id, aofid, source, type;
                        if ($(this).data("payment-method")) {
                            // the user clicked on a payment item
                            id = $(this).data("payment-method");
                            aofid = null;
                            source = $("#detail-template").html();
                            type = $(this).data("payment-type");
                        } else {
                            // the user clicked on an account on file
                            id = $(this).data("aof-ppid");
                            aofid = $(this).data("aof-id");
                            source = $("#aof-template").html();
                        }
                        renderPaymentProductDetails(id, aofid, source, type);
                    });

            }, function () {
                // The promise failed, inform the user what happened.

                $("#loading").hide();
                setDebugMessage("Unable to get data from the server, check your Client Session ID and consumer ID", "example.js", 117);
            });
        }

        // ======================================================================= //
        // STEP 3: Retrieve all the details about the payment item fields,         //
        // build the screen and set up the handlers.                               //
        // ======================================================================= //
        function renderPaymentProductDetails(id, aofid, source, type) {
            window.scrollTo(0, 0);
            $("#loading").show();

            if (type === "group") {
                session.getPaymentProductGroup(id, paymentDetails).then(function (paymentProductGroup) {
                    $("#loading").hide();
                    _renderPage(paymentProductGroup, source, null, true);
                }, function () {
                    // error
                });
            }
            if (type === "product") {
                // get the paymentproduct details using the SDK, this is an async task that we provide you as a promise
                session.getPaymentProduct(id, paymentDetails).then(function (paymentProduct) {
                    // The promise has fulfilled.

                    $("#loading").hide();

                    // Add the selected paymentproduct to the paymentRequest
                    paymentRequest.setPaymentProduct(paymentProduct);

                    var accountOnFile = isNaN(aofid) ? null : paymentProduct.accountOnFileById[aofid];

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
                        // 4) Add handlers for some additional bells and whistles (such as tooltips, IIN lookups, etc)


                        // 1) Generate the HTML based on the Handlebars template
                        _renderPage(paymentProduct, source, accountOnFile, false);

                    }

                }, function () {
                    // The promise failed, inform the user what happened.

                    $("#loading").hide();
                    setDebugMessage("unable to get data from the server, check your Client Session ID and consumer ID", "example.js", 397);
                });
            }
        };

        // ======================================================================= //
        // STEP 4: Encrypt all the provided payment information                    //
        // ======================================================================= //
        function encrypt() {

            $("#loading").show();

            // Create an SDK encryptor object
            var encryptor = session.getEncryptor();

            // Encrypting is an async task that we provide you as a promise.
            encryptor.encrypt(paymentRequest).then(function (encryptedString) {
                // The promise has fulfilled.

                $("#loading").hide();

                // Now we have the encrypted string that you should send to your e-commerce server so your server
                // can provide it to the GlobalCollect platform in a secure server-2-server call.
                // This example application simply displays the encrypted string on the screen.
                $("body").addClass("end");
                $("#main").html("<div class='alert alert-info'>EXAMPLE page</div><p>You can now send the encrypted data to the GlobalCollect platform; please see the code in example.js</p>");
                setDebugMessage("paymentRequest has been encrypted to: " + encryptedString, 'example.js', 422, "INFO");

            }, function (errors) {
                // The promise failed, inform the user what happened.

                $("#loading").hide();
                setDebugMessage("Failed to encrypt due to " + JSON.stringify(errors), 'example.js', 428);
            });
        }

        function _renderPage(paymentItem, source, accountOnFile, isGroup) {
            var template = Handlebars.compile(source);
            var json = paymentItem.json;

            // We now add some additional stuff to the JSON object that represents the selected payment product so handlebars
            // can actually fill out all the variables in its template. Some of these values for these variables are not
            // available in the core payment product info so we add them.
            $.each(json.fields, function (index, field) {
                // A) a isCurrency field because the #if Handlebars clause it too limited (it cannot do the === 'currency' check itself)
                if (field.displayHints.formElement.type === "currency") {
                    field.displayHints.formElement.isCurrency = true;
                }

                // B) The paymentDetails so we can use its data in the field renderer; useful for printing currency etc.
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
                        // method on the AccountOnFile object because that uses the masking info that is provided in the
                        // AccountOnFile displayHints object. That object is used to indicate which AoF fields should be shown
                        // in the payment product selection list by including only the masks for those fields. In our case we want
                        // to mask all known fields, so we fall back to the mask information in the paymentProductField object.
                        var paymentProductField = paymentItem.paymentProductFieldById[field.id];
                        field.knownValue = paymentProductField.applyWildcardMask(relatedAofField.value).formattedValue;

                        // We also determine if this field should be readonly. This depends on the status of the field
                        // as defined in the Account On File object. If the status is READ_ONLY it cannot be changed, but
                        // if the value is CAN_WRITE or even MUST_WRITE it's existing value can be overwritten.
                        field.isReadOnly = !relatedAofField.status || relatedAofField.status === 'READ_ONLY';
                    }
                }

                // D) Fields that are part of the aofData and that have the READ_ONLY status should be excluded from the
                //    encrypted blob.
                field.includeInEncryptedBlob = field.isReadOnly === undefined || field.isReadOnly ? "false" : "true";

                // E) indicate that this field is the cardnumber field to render the holder for the cobrands feature
                if (field.id === "cardNumber") {
                    field.isCardNumberField = true;
                }
            });

            // E) There's one field that we should add to the form that is not included in the payment product fields list for
            // a payment product: the "remember me" option, aka : tokenization. It's only visible if the payment product
            // itself allows it: allowsTokenization === true && autoTokenized === false.  (If autoTokenized === true it will
            // get tokenized automatically by the server and we do not need to show the checkbox).

            // for groups a different logic is in place: if the payment is recurring the checkbox should be shown.
            if (isGroup) {
                json.showRememberMe = paymentDetails.isRecurring;
            } else {
                json.showRememberMe = json.allowsTokenization === true && json.autoTokenized === false;
            }

            // We have extended the JSON object that represents the payment product so that it contains
            // all the necessary information to fill in the Handlebars template. Now we generate the
            // HTML and add it to the DOM.
            $("#handlebarsDrop").html(template(json));
            if (!json.showRememberMe) {
                $("#rememberme").closest('.checkbox').hide();
            }

            // When clicking "cancel" the user returns to the payment product selections page.
            $(".cancel").on("click", function (e) {
                e.preventDefault();

                // go back to the paymentProductSelection page by rendering the cached pps html into the handlebars container
                renderPaymentProductSelection();
            });


            // 2) Add validators to each of the fields in the form
            connect.addValidators(paymentItem);


            // 3) Add submit handling for when the user finishes filling out the form

            // After the customer is done filling out the form he submits it. But instead of sending the form to the server
            // we validate it and if successful we encrypt the result. Your application should send the cypher text to
            // your e-commerce server itself.
            $(".validatedForm").validate({
                submitHandler: function (e) {

                    // We create an object with key:value pairs consisting on the id of the paymentproductfield
                    // and its value as presented (with or without mask).
                    var blob = {};

                    // We only add the form elements that have the "data-includeInEncryptedBlob=true" attribute; which we've added
                    // to each input/select when we created the form.
                    $(".validatedForm [data-includeInEncryptedBlob=true]").each(function () {

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

                    // Remember that we need to add all entered values to paymentRequest so they will be included in the
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


            // 4) Add handlers for some additional bells and whistles (such as tooltips, IIN lookups, etc)

            // A) Sometimes we show the "tokenize payment" checkbox (See above). Because of this special way of including the
            //    field we also need a separate handling of it. That is done here.
            $("#rememberme").on("change", function () {
                paymentRequest.setTokenize($(this).is(":checked"));
            });

            // B) Some fields have tooltips (e.g. the CVV code field). We initialize the popups that contain those tooltips here.
            $('.info-popover').popover();

            // C) We mask the fields that need masking as defined in the payment product field definition. Either use use a jquery masked
            //    input plugin, or write your own. In this example we use jquery formatter plugin, which is included in this file at the
            //    bottom.

            connect.updateFieldMask(paymentItem);

            // D) The creditcard field has an IIN lookup that determines the issuer of the card. It could be the case that the customer chose
            //    payment product VISA but entered a mastercard creditcard number. In that case the selected payment product should switch.
            $("#cardNumber").after('<span class="cc-image"></span>');
            $("#cardNumber").parent().find(".cc-image").html('<img src="' + paymentItem.displayHints.logo + '">').show();
            var currentFirst6Digits = '',
                storedFirst6Digits = '';
            $("#cardNumber").on("keyup", function (e) {
                if (e.keyCode === 17 || e.keyCode === 91) {
                    // don't handle ctrl events (copy paste otherwise will send double iin details calls)
                    return true;
                }
                // we only need to analyse the card's first 6 digits
                currentFirst6Digits = $(this).val().substring(0, 7);
                if (currentFirst6Digits !== storedFirst6Digits) {
                    // We ue the SDK to do the IIN lookup, this is an async task that we provide you as a promise
                    session.getIinDetails($(this).val(), paymentDetails).then(function (response) {
                        // The promise has fulfilled.
                        connect.hideCobranding();
                        // if this new creditcard is supported you can show the new logo in the helper element
                        if (response.status === "SUPPORTED") {
                            //Remove notAllowedInContext class so validator succeeds if there was a SUPPORTED_BUT_NOT_ALLOWED response before
                            $("#cardNumber").removeClass('notAllowedInContext');
                            storedFirst6Digits = currentFirst6Digits;
                            // Fetch the paymentproduct that belongs to the id the IIN returned, this is an async task that we provide you as a promise
                            session.getPaymentProduct(response.paymentProductId, paymentDetails).then(function (paymentProduct) {
                                // The promise has fulfilled.
                                //update field Mask in case a different cardnumber is filled in
                                connect.updateFieldMask(paymentProduct);
                                // update the paymentproduct in the request
                                paymentRequest.setPaymentProduct(paymentProduct);
                                connect.updatePaymentProduct(paymentProduct);
                                connect.handleCobrands(paymentProduct, response, paymentRequest, session, paymentDetails);
                            });

                        } else if (response.status === "EXISTING_BUT_NOT_ALLOWED") {
                            // The creditcard number that the user provided did map on a supported (for this merchant) issuer.
                            // But the payment is not allowed with the current payment context. (countryCode, isRecurring, amount, currencyCode)
                            // We handle this by adding a method to the jquery validator who checks for the class 'notAllowedInContext'
                            $("#cardNumber").parent().find(".cc-image").hide();
                            $("#cardNumber").addClass('notAllowedInContext');
                            $(".validatedForm").validate();
                        } else {
                            // The creditcard number that the user provided did not map on any known or supported
                            // (for this merchant) issuer. We decide to not change the payment product and simply
                            // hide the payment poduct logo to indicate that it's unknown / unsupported.
                            $("#cardNumber").parent().find(".cc-image").hide();
                        }

                    }, function (response) {
                        // The promise failed, inform the user what happened.

                        // The creditcard number that the user provided did not map on any known or supported
                        // (for this merchant) issuer. We decide to not change the payment product and simply
                        // hide the payment poduct logo to indicate that it's unknown / unsupported.
                        $("#cardNumber").parent().find(".cc-image").hide();
                    });
                }
            });
        };
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
    $("#startPayment").on("click", function (e) {
        e.preventDefault();
        var sd = jQuery.extend({}, sessionDetails, {
            "clientSessionID": $("#clientSessionId").val(),
            "customerId": $("#customerId").val(),
            "region": $("#region").val(),
            "environment": $("#environment").val()
        });

        // create a paymentDetails for getting payment option information; the options are based on:
        // - you as a merchant
        // - the amount (in cents!)
        // - the locale / country
        // - if the payment is recurring
        // - the currency of the payment
        var pd = jQuery.extend({}, paymentDetails, {
            "totalAmount": $("#amountInCents").val(),
            "countryCode": $("#countryCode").val(),
            "locale": $("#locale").val(),
            "isRecurring": $("#isRecurring").is(":checked"),
            "currency": $("#currency").val()
        });
        startPayment(sd, pd);
    });

    // for helping you out to determine the various errors we capture ALL javascript errors
    var setDebugMessage = function (msg, url, line, type) {
        if (!type) {
            $("#debug div").html("<strong>An error occured</strong> <br />Error: " + msg + "<br />Line: " + line + "<br />Url: " + url).parent().show();
        } else {
            $("#debug div").html("<strong>" + type + "</strong> <br />Message: " + msg + "<br />Line: " + line + "<br />Url: " + url).parent().show();
        }
    };

    window.onerror = function (msg, url, line) {
        setDebugMessage(msg, url, line);
    };

    $("#debug .close").on("click", function () {
        $(this).parent().hide();
    });

    // the example shows a collapsible shoppingcart on mobile devices, the next lines of code toggles between the full view and the collapsed view
    // if you don't plan to use this you can remove this code.
    var $cart = $(".cart");
    $cart.on("click", ".header", function (e) {
        e.preventDefault();
        $cart.addClass("open");
    });
    $cart.on("click", "tfoot", function (e) {
        e.preventDefault();
        $cart.removeClass("open");
    });
});
