///<amd-module name="connectsdk.BasicPaymentItems"/>

import AccountOnFile = require("./AccountOnFile");
import BasicPaymentProductGroups = require("./BasicPaymentProductGroups");
import BasicPaymentProducts = require("./BasicPaymentProducts");
import { BasicPaymentItem, BasicPaymentItemByIdMap } from "./BasicPaymentItem";

function _parseJson(_products: BasicPaymentProducts, _groups: BasicPaymentProductGroups | null | undefined, _basicPaymentItems: BasicPaymentItems): void {
  if (_groups) {
    const groupReplacements: { [name: string]: true | undefined } = {};
    for (const product of _products.basicPaymentProducts) {
      // becomes true if the product has been matched with a group.
      let groupMatch = false;
      for (const group of _groups.basicPaymentProductGroups) {
        if (product.paymentProductGroup === group.id) {
          // Product has been matched to a group
          groupMatch = true;
          if (!groupReplacements[group.id]) {
            // Group has not been added as replacement yet
            _basicPaymentItems.basicPaymentItems.push(group.copy());
            groupReplacements[group.id] = true;
          }
          // Products can not match with more then one group
          break;
        }
      }
      if (!groupMatch) {
        _basicPaymentItems.basicPaymentItems.push(product.copy());
      }
    }
  } else {
    for (const product of _products.basicPaymentProducts) {
      _basicPaymentItems.basicPaymentItems.push(product.copy());
    }
  }
  for (const basicPaymentItem of _basicPaymentItems.basicPaymentItems) {
    _basicPaymentItems.basicPaymentItemById[basicPaymentItem.id] = basicPaymentItem;
    if (basicPaymentItem.accountsOnFile) {
      for (const aof of basicPaymentItem.accountsOnFile) {
        _basicPaymentItems.accountsOnFile.push(aof);
        _basicPaymentItems.accountOnFileById[aof.id] = aof;
      }
    }
  }
}

class BasicPaymentItems {
  readonly basicPaymentItems: BasicPaymentItem[];
  readonly basicPaymentItemById: BasicPaymentItemByIdMap;
  readonly accountsOnFile: AccountOnFile[];
  readonly accountOnFileById: { [id: number]: AccountOnFile | undefined };

  constructor(products: BasicPaymentProducts, groups?: BasicPaymentProductGroups | null) {
    this.basicPaymentItems = [];
    this.basicPaymentItemById = {};
    this.accountsOnFile = [];
    this.accountOnFileById = {};

    _parseJson(products, groups, this);
  }
}

export = BasicPaymentItems;
