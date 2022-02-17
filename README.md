# Ingenico Connect JavaScript SDK

## Introduction

The JavaScript SDK helps you to communicate with the [Ingenico Connect](https://epayments.developer-ingenico.com/) Client API. Its primary features are:

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

This repository consists out of one main component:

1. The source code of the SDK itself: `/src/`

## Building the repository

This repository uses [gulp](http://gulpjs.com/) to build. Assuming you have npm and gulp installed, building is straightforward:

1. If it exists, remove the `dist` folder.
2. From the root of the project install all dependencies: `npm install`
3. From the same location run gulp: `npm run build`
4. The result of the build will have been written to the `dist` folder. This folder will contain the following files:
    - `/dist/index.js` - The result of compiling the TypeScript source code to AMD modules, as a single file
    - `/dist/index.d.ts` - TypeScript definitions for `index.js`
    - `/dist/connectsdk.js` - The compiled TypeScript AMD modules plus bundled encryption components and support for loading directly in the browser
    - `/dist/connectsdk.min.js` - The minified version of `connectsdk.js`
    - `/dist/connectsdk.noEncrypt.js` - The compiled TypeScript AMD modules plus support for loading directly in the browser, but without the encryption components
    - `/dist/connectsdk.noEncrypt.min.js` - The minified version of `connectsdk.noEncrypt.js`

## Installation

From the folder where your `package.json` is located, run the following command to install the SDK:

    npm i connect-sdk-client-js

Inside the `node_modules` folder, the SDK will contain a `dist` folder that contains the files created by building the repository (see above). From these files, you should use `dist/index.js` if your module loader or module bundler supports AMD. Otherwise, use `dist/connectsdk.js`, `dist/connectsdk.noEncrypt.js` or their minified versions.

⚠ When using a module loader or module bundler that supports AMD, the SDK has a dependency on `node-forge`, even if encryption is not needed. 
You need to provide a `node-forge` module if it is not yet available. This may return an empty object. For instance:

    define('node-forge], [], function () {
      return {};
    });

Or, to provide `node-forge` itself if it's only available as a global variable `forge`:

    define('node-forge], [], function () {
      return forge;
    });
