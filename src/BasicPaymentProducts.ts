///<amd-module name="connectsdk.BasicPaymentProducts"/>

import AccountOnFile = require("./AccountOnFile");
import { PaymentProductsJSON } from "./apimodel";
import BasicPaymentProduct = require("./BasicPaymentProduct");

function _parseJson(
  _json: PaymentProductsJSON,
  _paymentProducts: BasicPaymentProduct[],
  _accountsOnFile: AccountOnFile[],
  _paymentProductById: { [id: number]: BasicPaymentProduct | undefined },
  _accountOnFileById: { [id: number]: AccountOnFile | undefined },
  _paymentProductByAccountOnFileId: { [id: number]: BasicPaymentProduct | undefined }
): void {
  if (_json.paymentProducts) {
    for (const product of _json.paymentProducts) {
      const paymentProduct = new BasicPaymentProduct(product);
      _paymentProducts.push(paymentProduct);
      _paymentProductById[paymentProduct.id] = paymentProduct;

      if (paymentProduct.accountsOnFile) {
        for (const aof of paymentProduct.accountsOnFile) {
          _accountsOnFile.push(aof);
          _accountOnFileById[aof.id] = aof;
          _paymentProductByAccountOnFileId[aof.id] = paymentProduct;
        }
      }
    }
  }
}

class BasicPaymentProducts {
  readonly basicPaymentProducts: BasicPaymentProduct[];
  readonly basicPaymentProductById: { [id: number]: BasicPaymentProduct | undefined };
  readonly basicPaymentProductByAccountOnFileId: { [id: number]: BasicPaymentProduct | undefined };
  readonly accountsOnFile: AccountOnFile[];
  readonly accountOnFileById: { [id: number]: AccountOnFile | undefined };

  constructor(readonly json: PaymentProductsJSON) {
    this.basicPaymentProducts = [];
    this.basicPaymentProductById = {};
    this.basicPaymentProductByAccountOnFileId = {};
    this.accountsOnFile = [];
    this.accountOnFileById = {};

    _parseJson(json, this.basicPaymentProducts, this.accountsOnFile, this.basicPaymentProductById, this.accountOnFileById, this.basicPaymentProductByAccountOnFileId);
  }
}

export = BasicPaymentProducts;
