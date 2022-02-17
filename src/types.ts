///<amd-module name="connectsdk.types"/>

import { PaymentProductsJSON } from "./apimodel";

// Communicator / session related

export interface PaymentProductSessionContext {
  displayName: string;
  domainName: string;
  validationURL: string;
}

export interface PaymentProductSpecificInputs {
  bancontact?: BancontactSpecificInput;
  applePay?: ApplePaySpecificInput;
  googlePay?: GooglePaySpecificInput;
}

export interface BancontactSpecificInput {
  forceBasicFlow: boolean;
}

export interface ApplePaySpecificInput {
  merchantName: string;
  acquirerCountry?: string;
}

export interface GooglePaySpecificInput {
  merchantId: string;
  gatewayMerchantId: string;
  merchantName?: string;
}

export interface PaymentDetails {
  totalAmount: number;
  countryCode: string;
  isRecurring: boolean;
  currency: string;
  locale?: string;
  isInstallments?: boolean;
  accountOnFileId?: number;
  environment?: string | "PROD";
}

export interface SessionDetails {
  clientSessionId: string;
  assetUrl: string;
  clientApiUrl: string;
  customerId: string;
}

// ApplePay related

export interface ApplePayPaymentDetails extends PaymentDetails {
  displayName: string;
  acquirerCountry?: string;
  networks: string[];
}

export interface ApplePayInitResult {
  message: string;
  data: ApplePayJS.ApplePayPaymentToken;
}

// Services related

export type IinDetailsStatus = "SUPPORTED" | "EXISTING_BUT_NOT_ALLOWED" | "UNSUPPORTED" | "UNKNOWN" | "NOT_ENOUGH_DIGITS";

// Validation related

// This interface is used to break the circular import dependency between validation rules and PaymentRequest.
// PaymentRequest automatically implements it.
export interface ValidatableRequest {
  getValue(paymentProductFieldId: string): string | undefined;
  getMaskedValue(paymentProductFieldId: string): string | undefined;
  getUnmaskedValue(paymentProductFieldId: string): string | undefined;
}

export interface ValidationError {
  fieldId: string;
  errorMessageId: string;
}

export interface ValidationRule {
  readonly json: ValidationRuleDefinition<unknown>;
  readonly type: string;
  readonly errorMessageId: string;

  validate(value: string): boolean;
  validateValue(request: ValidatableRequest, fieldId: string): boolean;
}

export interface ValidationRuleDefinition<T> {
  readonly type: string;
  readonly attributes: T;
}

// Util related

export interface Metadata {
  readonly screenSize: string;
  readonly platformIdentifier: string;
  readonly sdkIdentifier: string;
  readonly sdkCreator: string;
}

export interface BrowserData {
  readonly javaScriptEnabled: true;
  readonly javaEnabled: boolean;
  readonly colorDepth: number;
  readonly screenHeight: number;
  readonly screenWidth: number;
  readonly innerHeight: number;
  readonly innerWidth: number;
}

export interface DeviceInformation {
  readonly timezoneOffsetUtcMinutes: number;
  readonly locale: string;
  readonly browserData: BrowserData;
}

export interface Util {
  readonly applePayPaymentProductId: 302;
  readonly googlePayPaymentProductId: 320;
  readonly bancontactPaymentProductId: 3012;

  readonly paymentProductsThatAreNotSupportedInThisBrowser: number[];

  getMetadata(): Metadata;
  collectDeviceInformation(): DeviceInformation;
  base64Encode(data: object | string): string;
  filterOutProductsThatAreNotSupportedInThisBrowser(json: PaymentProductsJSON): void;
}

// API client related

export interface AjaxRequestOptions {
  /** HTTP method - GET, POST, etc. */
  method?: string;
  /** Headers */
  headers?: { [key: string]: string | undefined };
  /** A callback to run when a request is successful */
  success?: (response: SdkResponse, request: XMLHttpRequest) => void;
  /** A callback to run when the request fails */
  error?: (response?: SdkResponse, request?: XMLHttpRequest) => void;
  /** A callback to run when a request completes, successful or not */
  callback?: (response: SdkResponse, request: XMLHttpRequest) => void;
  /** Defaults to asynchronous */
  asynchronous?: boolean;
  /** The HTTP POST body */
  postBody?: string;
  /** The content type of the request, default is `application/x-www-form-urlencoded` */
  contentType?: string;
}

export interface AjaxRequest {
  set(key: string, value: string): AjaxRequest;
  send(data: object | string, callback: (response: SdkResponse, request: XMLHttpRequest) => void): AjaxRequest;
  end(callback?: (response: SdkResponse, request: XMLHttpRequest) => void): AjaxRequest;
  data(data: object | string): AjaxRequest;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  then(success: (result: SdkResponse) => void, failure?: (result: any) => void): AjaxRequest;
}

export interface JSONPOptions {
  success: (json: unknown) => void;
  failure?: () => void;
}

export interface SdkResponse {
  status: number;
  responseText: string;
  responseJSON?: unknown;
  responseXML?: unknown;
  success: boolean;
}
