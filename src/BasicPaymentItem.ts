///<amd-module name="connectsdk.BasicPaymentItem"/>

import BasicPaymentProduct = require("./BasicPaymentProduct");
import BasicPaymentProductGroup = require("./BasicPaymentProductGroup");

export type BasicPaymentItem = BasicPaymentProduct | BasicPaymentProductGroup;

export type BasicPaymentItemByIdMap = {
  [id: number]: BasicPaymentItem;
  [id: string]: BasicPaymentItem;
};
