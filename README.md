# Ingenico Connect JavaScript SDK

## Introduction

The JavaScript SDK helps you to communicate with the [Ingenico Connect](https://epayments.developer-ingenico.com/) Client API. It's primary features are:

* handling of all the details concerning the encryption of the payment details,
* convenient JavaScript wrapper around the API calls and responses,
* localization of various labels and messages,
* user-friendly formatting (masking) of payment data such as card numbers and expiry dates,
* validation of input, and
* a check to determine to which payment provider a card number is associated.

See the [Ingenico ePayments Developer Hub](https://epayments.developer-ingenico.com/documentation/sdk/mobile/javascript/) for more information on how to use the SDK.

## Examples

⚠ Please note that all examples have been moved to their own [repository](https://github.com/Ingenico-ePayments/connect-sdk-client-js-example).

## Structure of this repository

This repository consists out of three main components:

1. The source code of the SDK itself: `/src/`
2. A distributable folder containing the result of the builds of the previous two components: `/dist/`
  - `/dist/connectsdk.js` - The concatenated but not minified full SDK source
  - `/dist/connectsdk.min.js` - The minified version of `connectsdk.js`
  - `/dist/connectsdk.noEncrypt.js` - The concatenated but not minified SDK source without the encryption components
  - `/dist/connectsdk.noEncrypt.min.js` - The minified version of `connectsdk.noEncrypt.js`

## Building the repository

This repository uses [gulp](http://gulpjs.com/) to build. Assuming you have npm and gulp installed, building is straightforward:

1. If it exists remove the `dist` folder.
2. From the root of the project install all dependencies: `npm install`.
3. From the same location run gulp: `gulp build`.
4. The result of the build will have been written to the `dist` folder. 
