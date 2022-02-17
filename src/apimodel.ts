///<amd-module name="connectsdk.apimodel"/>

// PaymentProduct and PaymentProductGroup related

export interface AccountOnFileJSON {
  attributes: AccountOnFileAttributeJSON[];
  displayHints: AccountOnFileDisplayHintsJSON;
  id: number;
  paymentProductId: number;
}

export interface AccountOnFileAttributeJSON extends KeyValuePairJSON {
  mustWriteReason?: string;
  status: string;
}

export interface AccountOnFileDisplayHintsJSON {
  labelTemplate: LabelTemplateElementJSON[];
  logo: string;
}

export interface AuthenticationIndicatorJSON {
  name: string;
  value: string;
}

export interface BasicPaymentProductJSON {
  accountsOnFile?: AccountOnFileJSON[];
  acquirerCountry?: string;
  allowsInstallments: boolean;
  allowsRecurring: boolean;
  allowsTokenization: boolean;
  authenticationIndicator?: AuthenticationIndicatorJSON;
  autoTokenized: boolean;
  canBeIframed?: boolean;
  deviceFingerprintEnabled: boolean;
  displayHints: PaymentProductDisplayHintsJSON;
  id: number;
  isJavaScriptRequired?: boolean;
  maxAmount?: number;
  minAmount?: number;
  mobileIntegrationLevel: string;
  paymentMethod: string;
  paymentProduct302SpecificData?: PaymentProduct302SpecificDataJSON;
  paymentProduct320SpecificData?: PaymentProduct320SpecificDataJSON;
  paymentProduct863SpecificData?: PaymentProduct863SpecificDataJSON;
  paymentProductGroup?: string;
  usesRedirectionTo3rdParty: boolean;
  // added by the SDK
  type?: "product";
}

export interface BasicPaymentProductGroupJSON {
  accountsOnFile?: AccountOnFileJSON[];
  allowsInstallments: boolean;
  deviceFingerprintEnabled: boolean;
  displayHints: PaymentProductDisplayHintsJSON;
  id: string;
  // added by the SDK
  type?: "group";
}

export interface CreatePaymentProductSessionRequestJSON {
  paymentProductSession302SpecificInput?: MobilePaymentProductSession302SpecificInputJSON;
}

export interface CreatePaymentProductSessionResponseJSON {
  paymentProductSession302SpecificOutput?: MobilePaymentProductSession302SpecificOutputJSON;
}

export interface DirectoryJSON {
  entries: DirectoryEntryJSON[];
}

export interface DirectoryEntryJSON {
  countryNames?: string[];
  issuerId: string;
  issuerList?: string;
  issuerName: string;
}

export interface KeyValuePairJSON {
  key: string;
  value: string;
}

export interface LabelTemplateElementJSON {
  attributeKey: string;
  mask: string;
}

export interface MobilePaymentProductSession302SpecificInputJSON {
  displayName?: string;
  domainName?: string;
  validationUrl?: string;
}

export interface MobilePaymentProductSession302SpecificOutputJSON {
  sessionObject: string;
}

export interface PaymentProductJSON extends BasicPaymentProductJSON {
  fields: PaymentProductFieldJSON[];
  fieldsWarning?: string;
}

export interface PaymentProductDisplayHintsJSON {
  displayOrder: number;
  label?: string;
  logo: string;
}

export interface PaymentProduct302SpecificDataJSON {
  networks: string[];
}

export interface PaymentProduct320SpecificDataJSON {
  gateway: string;
  networks: string[];
}

export interface PaymentProduct863SpecificDataJSON {
  integrationTypes: string[];
}

export interface PaymentProductFieldJSON {
  dataRestrictions: PaymentProductFieldDataRestrictionsJSON;
  displayHints?: PaymentProductFieldDisplayHintsJSON;
  id: string;
  type: string;
  usedForLookup?: boolean;
  // added by the SDK
  validators?: string[];
}

export interface PaymentProductFieldDataRestrictionsJSON {
  isRequired: boolean;
  validators: PaymentProductFieldValidatorsJSON;
}

export interface PaymentProductFieldDisplayElementJSON {
  id: string;
  label?: string;
  type: string;
  value: string;
}

export interface PaymentProductFieldDisplayHintsJSON {
  alwaysShow: boolean;
  displayOrder: number;
  formElement: PaymentProductFieldFormElementJSON;
  label?: string;
  link?: string;
  mask?: string;
  obfuscate: boolean;
  placeholderLabel?: string;
  preferredInputType?: string;
  tooltip?: PaymentProductFieldTooltipJSON;
}

export interface PaymentProductFieldFormElementJSON {
  type: string;
  valueMapping?: ValueMappingElementJSON[];
  // added by the SDK
  list?: boolean;
}

export interface PaymentProductFieldTooltipJSON {
  image: string;
  label?: string;
}

export interface PaymentProductFieldValidatorsJSON {
  boletoBancarioRequiredness?: BoletoBancarioRequirednessValidatorJSON;
  emailAddress?: EmptyValidatorJSON;
  expirationDate?: EmptyValidatorJSON;
  fixedList?: FixedListValidatorJSON;
  iban?: EmptyValidatorJSON;
  length?: LengthValidatorJSON;
  luhn?: EmptyValidatorJSON;
  range?: RangeValidatorJSON;
  regularExpression?: RegularExpressionValidatorJSON;
  residentIdNumber?: EmptyValidatorJSON;
  termsAndConditions?: EmptyValidatorJSON;
}

export interface PaymentProductGroupJSON extends BasicPaymentProductGroupJSON {
  fields: PaymentProductFieldJSON[];
}

export interface PaymentProductGroupsJSON {
  paymentProductGroups: BasicPaymentProductGroupJSON[];
}

export interface PaymentProductNetworksResponseJSON {
  networks: string[];
}

export interface PaymentProductsJSON {
  paymentProducts: BasicPaymentProductJSON[];
}

export interface ValueMappingElementJSON {
  displayElements: PaymentProductFieldDisplayElementJSON[];
  displayName?: string;
  value: string;
}

// Validators

export interface BoletoBancarioRequirednessValidatorJSON {
  fiscalNumberLength: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyValidatorJSON {}

export interface FixedListValidatorJSON {
  allowedValues: string[];
}

export interface LengthValidatorJSON {
  minLength: number;
  maxLength: number;
}

export interface RangeValidatorJSON {
  minValue: number;
  maxValue: number;
}

export interface RegularExpressionValidatorJSON {
  regularExpression: string;
}

// Crypto related

export interface PublicKeyJSON {
  keyId: string;
  publicKey: string;
}

// IIN related

export interface AmountOfMoneyJSON {
  amount: number;
  currencyCode: string;
}

export interface GetIINDetailsRequestJSON {
  bin: string;
  paymentContext?: PaymentContextJSON;
}

export interface GetIINDetailsResponseJSON {
  coBrands?: IinDetailJSON[];
  countryCode: string;
  isAllowedInContext?: boolean;
  paymentProductId: number;
}

export interface IinDetailJSON {
  isAllowedInContext: boolean;
  paymentProductId: number;
}

export interface PaymentContextJSON {
  amountOfMoney: AmountOfMoneyJSON;
  countryCode: string;
  isInstallments?: boolean;
  isRecurring?: boolean;
}

// Other services related

export interface ConvertAmountJSON {
  convertedAmount: number;
}

export interface GetCustomerDetailsRequestJSON {
  countryCode: string;
  values: KeyValuePairJSON[];
}

export interface GetCustomerDetailsResponseJSON {
  city?: string;
  country?: string;
  emailAddress?: string;
  firstName?: string;
  fiscalNumber?: string;
  languageCode?: string;
  phoneNumber?: string;
  street?: string;
  surname?: string;
  zip?: string;
}

export interface ThirdPartyStatusResponseJSON {
  thirdPartyStatus: string;
}

// Errors

export interface APIErrorJSON {
  category: string;
  code: string;
  httpStatusCode: number;
  id: string;
  message: string;
  propertyName: string;
  requestId: string;
}

export interface ErrorResponseJSON {
  errorId: string;
  errors: APIErrorJSON[];
}
