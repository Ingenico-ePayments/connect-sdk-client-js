///<amd-module name="connectsdk.PaymentItem"/>

import PaymentProduct = require("./PaymentProduct");
import PaymentProductGroup = require("./PaymentProductGroup");

export type PaymentItem = PaymentProduct | PaymentProductGroup;
