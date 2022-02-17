///<amd-module name="connectsdk.PaymentRequest"/>

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import AccountOnFile = require("./AccountOnFile");
import PaymentProduct = require("./PaymentProduct");
import { ValidationError } from "./types";

class PaymentRequest {
  readonly setValue: (paymentProductFieldId: string, value: string) => void;
  readonly setTokenize: (tokenize: boolean) => void;
  readonly getTokenize: () => boolean;
  /**
   * @deprecated This function does not return for which field the errors are. Use {@link .validate} instead.
   */
  readonly getErrorMessageIds: () => string[];
  readonly getValue: (paymentProductFieldId: string) => string | undefined;
  readonly getValues: () => { [id: string]: string | undefined };
  readonly getMaskedValue: (paymentProductFieldId: string) => string | undefined;
  readonly getMaskedValues: () => { [id: string]: string | undefined };
  readonly getUnmaskedValue: (paymentProductFieldId: string) => string | undefined;
  readonly getUnmaskedValues: () => { [id: string]: string | undefined };
  readonly setPaymentProduct: (paymentProduct: PaymentProduct) => void;
  readonly getPaymentProduct: () => PaymentProduct | undefined;
  readonly setAccountOnFile: (accountOnFile?: AccountOnFile | null) => void;
  readonly getAccountOnFile: () => AccountOnFile | undefined;
  readonly getClientSessionID: () => string;

  constructor(clientSessionID: string) {
    const _clientSessionID = clientSessionID;
    const _fieldValues: { [id: string]: string | undefined } = {};
    let _paymentProduct: PaymentProduct | undefined;
    let _accountOnFile: AccountOnFile | undefined;
    let _tokenize = false;

    this.setValue = (paymentProductFieldId: string, value: string): void => {
      _fieldValues[paymentProductFieldId] = value;
    };

    this.setTokenize = (tokenize: boolean): void => {
      _tokenize = tokenize;
    };

    this.getTokenize = (): boolean => {
      return _tokenize;
    };

    this.getErrorMessageIds = (): string[] => {
      return this.validate().map((error) => error.errorMessageId);
    };

    this.getValue = (paymentProductFieldId: string): string | undefined => {
      return _fieldValues[paymentProductFieldId];
    };

    this.getValues = (): { [id: string]: string | undefined } => {
      return _fieldValues;
    };

    this.getMaskedValue = (paymentProductFieldId: string): string | undefined => {
      const paymentProductField = _paymentProduct!.paymentProductFieldById[paymentProductFieldId];
      if (paymentProductField) {
        const value = this.getValue(paymentProductFieldId);
        if (typeof value !== "undefined") {
          const maskedString = paymentProductField.applyMask(value);
          return maskedString.formattedValue;
        }
      }
    };

    this.getMaskedValues = (): { [id: string]: string | undefined } => {
      const result: { [id: string]: string } = {};
      for (const paymentProductFieldId in _fieldValues) {
        const paymentProductField = _paymentProduct!.paymentProductFieldById[paymentProductFieldId];
        const maskedString = paymentProductField!.applyMask(this.getValue(paymentProductFieldId)!);
        result[paymentProductFieldId] = maskedString.formattedValue;
      }
      return result;
    };

    this.getUnmaskedValue = (paymentProductFieldId: string): string | undefined => {
      const paymentProductField = _paymentProduct!.paymentProductFieldById[paymentProductFieldId];
      if (paymentProductField) {
        const value = this.getValue(paymentProductFieldId);
        if (typeof value !== "undefined") {
          const maskedString = paymentProductField.applyMask(value);
          const formattedValue = maskedString.formattedValue;
          return paymentProductField.removeMask(formattedValue);
        }
      }
    };

    this.getUnmaskedValues = (): { [id: string]: string } => {
      const result: { [id: string]: string } = {};
      for (const paymentProductFieldId in _fieldValues) {
        const paymentProductField = _paymentProduct!.paymentProductFieldById[paymentProductFieldId];
        if (paymentProductField) {
          const maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId)!);
          const formattedValue = maskedString.formattedValue;
          result[paymentProductFieldId] = paymentProductField.removeMask(formattedValue);
        }
      }
      return result;
    };

    this.setPaymentProduct = (paymentProduct: PaymentProduct): void => {
      _paymentProduct = paymentProduct;
    };

    this.getPaymentProduct = (): PaymentProduct | undefined => {
      return _paymentProduct;
    };

    this.setAccountOnFile = (accountOnFile?: AccountOnFile | null): void => {
      if (accountOnFile) {
        for (const attribute of accountOnFile.attributes) {
          if (attribute.status !== "MUST_WRITE") {
            delete _fieldValues[attribute.key];
          }
        }
      }
      _accountOnFile = accountOnFile || undefined;
    };

    this.getAccountOnFile = (): AccountOnFile | undefined => {
      return _accountOnFile;
    };

    this.getClientSessionID = (): string => {
      return _clientSessionID;
    };
  }

  isValid(): boolean {
    return !!this.getPaymentProduct() && this.validate().length === 0;
  }

  /**
   * Validates that the necessary fields are set with correct values.
   * @throws If the payment product has not been set yet.
   */
  validate(): ValidationError[] {
    const paymentProduct = this.getPaymentProduct();
    if (!paymentProduct) {
      throw new Error("Error validating PaymentRequest, please set a paymentProduct first.");
    }

    const errors: ValidationError[] = [];
    // check fields that are set first
    const fieldValues = this.getValues();
    for (const key in fieldValues) {
      const paymentProductField = paymentProduct.paymentProductFieldById[key];
      if (paymentProductField) {
        errors.push(
          ...paymentProductField.getErrorMessageIds(this).map((id) => ({
            fieldId: paymentProductField.id,
            errorMessageId: id,
          }))
        );
      }
    }

    // besides checking the fields for errors, check if all mandatory fields are present as well

    let aof = this.getAccountOnFile();
    if (aof && aof.paymentProductId !== paymentProduct.id) {
      // the account-on-file does not belong to the payment product; ignore it
      aof = undefined;
    }
    const hasValueInAof = (fieldId: string): boolean => {
      const attribute = aof?.attributeByKey[fieldId];
      return !!attribute && attribute.status !== "MUST_WRITE";
    };

    for (const field of paymentProduct.paymentProductFields) {
      if (field.dataRestrictions.isRequired) {
        // is this field present in the request?
        const storedValue = this.getValue(field.id);
        // if the account on file has the field we can ignore it
        if (!storedValue && !hasValueInAof(field.id)) {
          errors.push({
            fieldId: field.id,
            errorMessageId: "required",
          });
        }
      }
    }
    return errors;
  }
}

export = PaymentRequest;
