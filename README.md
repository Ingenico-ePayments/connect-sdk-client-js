# GlobalCollect JavaScript SDK

## Introduction

The JavaScript SDK helps you to communicate with the [GlobalCollect](http://www.globalcollect.com/) Client API. It's primary features are:

* handling of all the details concerning the encryption of the payment details,
* convenient JavaScript wrapper around the API calls and responses,
* localization of various labels and messages,
* user-friendly formatting (masking) of payment data such as card numbers and expiry dates,
* validation of input, and
* a check to determine to which payment provider a card number is associated.

Its use is demonstrated by an example application that is also included. This application constructs the user interface elements used throughout the payment process from API responses on the fly. 

See the [GlobalCollect Developer Portal](https://developer.globalcollect.com/documentation/sdk/javascript/) for more information on how to use the API.

## Structure of this repository

This repository consists out of three main components:

1. The source code of the SDK itself: `/src/example-app/js-sdk/`
2. The source code of the example application: `/src/example-app/`
3. A distributable folder containing the result of the builds of the previous two components: `/dist/`
  - `/dist/gcsdk.js` - The concatenated but not minified full SDK source
  - `/dist/gcsdk.min.js` - The minified version of `gcsdk.js`
  - `/dist/gcsdk.noEncrypt.js` - The concatenated but not minified SDK source without the encryption components
  - `/dist/gcsdk.noEncrypt.min.js` - The minified version of `gcsdk.noEncrypt.js`

If you would like to use the example application to base your own implementation on we advice to use the version that has been built. It already contains the minified SDK instead of the SDK source code like in the version of the application in `/src/example-app/`.

## Building the repository

This repository uses [gulp](http://gulpjs.com/) to build. Assuming you have npm and gulp installed, building is straightforward:

1. If it exists remove the `dist` folder.
2. From the root of the project install all dependencies: `npm install`.
3. From the same location run gulp: `gulp`.
4. The result of the build will have been written to the `dist` folder. 