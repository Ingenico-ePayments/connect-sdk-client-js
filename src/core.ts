///<amd-module name="connectsdk.core"/>

import _AccountOnFile = require("./AccountOnFile");
import _AccountOnFileDisplayHints = require("./AccountOnFileDisplayHints");
import _ApplePay = require("./ApplePay");
import _Attribute = require("./Attribute");
import _BasicPaymentItems = require("./BasicPaymentItems");
import _BasicPaymentProduct = require("./BasicPaymentProduct");
import _BasicPaymentProductGroup = require("./BasicPaymentProductGroup");
import _BasicPaymentProductGroups = require("./BasicPaymentProductGroups");
import _BasicPaymentProducts = require("./BasicPaymentProducts");
import _C2SCommunicator = require("./C2SCommunicator");
import _C2SCommunicatorConfiguration = require("./C2SCommunicatorConfiguration");
import _C2SPaymentProductContext = require("./C2SPaymentProductContext");
import _DataRestrictions = require("./DataRestrictions");
import _Encryptor = require("./Encryptor");
import _FormElement = require("./FormElement");
import _GooglePay = require("./GooglePay");
import _IinDetailsResponse = require("./IinDetailsResponse");
import _JOSEEncryptor = require("./JOSEEncryptor");
import _LabelTemplateElement = require("./LabelTemplateElement");
import _MaskedString = require("./MaskedString");
import _MaskingUtil = require("./MaskingUtil");
import _Net = require("./net");
import _PaymentProduct = require("./PaymentProduct");
import _PaymentProduct302SpecificData = require("./PaymentProduct302SpecificData");
import _PaymentProduct320SpecificData = require("./PaymentProduct320SpecificData");
import _PaymentProduct863SpecificData = require("./PaymentProduct863SpecificData");
import _PaymentProductField = require("./PaymentProductField");
import _PaymentProductFieldDisplayHints = require("./PaymentProductFieldDisplayHints");
import _PaymentProductGroup = require("./PaymentProductGroup");
import _PaymentRequest = require("./PaymentRequest");
import _Promise = require("./promise");
import _PublicKeyResponse = require("./PublicKeyResponse");
import _session = require("./session");
import _Tooltip = require("./Tooltip");
import _Util = require("./Util");
import _ValidationRuleBoletoBancarioRequiredness = require("./ValidationRuleBoletoBancarioRequiredness");
import _ValidationRuleEmailAddress = require("./ValidationRuleEmailAddress");
import _ValidationRuleExpirationDate = require("./ValidationRuleExpirationDate");
import _ValidationRuleFactory = require("./ValidationRuleFactory");
import _ValidationRuleFixedList = require("./ValidationRuleFixedList");
import _ValidationRuleIban = require("./ValidationRuleIban");
import _ValidationRuleLength = require("./ValidationRuleLength");
import _ValidationRuleLuhn = require("./ValidationRuleLuhn");
import _ValidationRuleRange = require("./ValidationRuleRange");
import _ValidationRuleRegularExpression = require("./ValidationRuleRegularExpression");
import _ValidationRuleResidentIdNumber = require("./ValidationRuleResidentIdNumber");
import _ValidationRuleTermsAndConditions = require("./ValidationRuleTermsAndConditions");
import _ValueMappingElement = require("./ValueMappingElement");

const connectsdk = {
  AccountOnFile: _AccountOnFile,
  AccountOnFileDisplayHints: _AccountOnFileDisplayHints,
  ApplePay: _ApplePay,
  Attribute: _Attribute,
  BasicPaymentItems: _BasicPaymentItems,
  BasicPaymentProduct: _BasicPaymentProduct,
  BasicPaymentProductGroup: _BasicPaymentProductGroup,
  BasicPaymentProductGroups: _BasicPaymentProductGroups,
  BasicPaymentProducts: _BasicPaymentProducts,
  C2SCommunicator: _C2SCommunicator,
  C2SCommunicatorConfiguration: _C2SCommunicatorConfiguration,
  C2SPaymentProductContext: _C2SPaymentProductContext,
  DataRestrictions: _DataRestrictions,
  Encryptor: _Encryptor,
  FormElement: _FormElement,
  GooglePay: _GooglePay,
  IinDetailsResponse: _IinDetailsResponse,
  JOSEEncryptor: _JOSEEncryptor,
  LabelTemplateElement: _LabelTemplateElement,
  MaskedString: _MaskedString,
  MaskingUtil: _MaskingUtil,
  net: _Net,
  get: _Net.get,
  post: _Net.post,
  jsonp: _Net.jsonp,
  PaymentProduct: _PaymentProduct,
  PaymentProduct302SpecificData: _PaymentProduct302SpecificData,
  PaymentProduct320SpecificData: _PaymentProduct320SpecificData,
  PaymentProduct863SpecificData: _PaymentProduct863SpecificData,
  PaymentProductField: _PaymentProductField,
  PaymentProductFieldDisplayHints: _PaymentProductFieldDisplayHints,
  PaymentProductGroup: _PaymentProductGroup,
  PaymentRequest: _PaymentRequest,
  Promise: _Promise,
  PublicKeyResponse: _PublicKeyResponse,
  Session: _session,
  Tooltip: _Tooltip,
  Util: _Util,
  ValidationRuleBoletoBancarioRequiredness: _ValidationRuleBoletoBancarioRequiredness,
  ValidationRuleEmailAddress: _ValidationRuleEmailAddress,
  ValidationRuleExpirationDate: _ValidationRuleExpirationDate,
  ValidationRuleFactory: _ValidationRuleFactory,
  ValidationRuleFixedList: _ValidationRuleFixedList,
  ValidationRuleIban: _ValidationRuleIban,
  ValidationRuleLength: _ValidationRuleLength,
  ValidationRuleLuhn: _ValidationRuleLuhn,
  ValidationRuleRange: _ValidationRuleRange,
  ValidationRuleRegularExpression: _ValidationRuleRegularExpression,
  ValidationRuleResidentIdNumber: _ValidationRuleResidentIdNumber,
  ValidationRuleTermsAndConditions: _ValidationRuleTermsAndConditions,
  ValueMappingElement: _ValueMappingElement,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const global = (typeof window === "undefined" ? this : window) as any;
global.connectsdk = connectsdk;

export = connectsdk;
