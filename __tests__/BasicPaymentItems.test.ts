/**
 * @group unit:BasicPaymentItems
 */

import { AccountOnFileJSON, BasicPaymentProductGroupJSON, BasicPaymentProductJSON } from "../src/apimodel";
import BasicPaymentItems = require("../src/BasicPaymentItems");
import BasicPaymentProductGroups = require("../src/BasicPaymentProductGroups");
import BasicPaymentProducts = require("../src/BasicPaymentProducts");

const productType: "product" = "product";
const basePaymentProductJSON: BasicPaymentProductJSON = {
  allowsInstallments: false,
  allowsRecurring: false,
  allowsTokenization: false,
  autoTokenized: false,
  deviceFingerprintEnabled: false,
  displayHints: {
    displayOrder: 0,
    logo: "",
  },
  id: 0,
  paymentMethod: "",
  mobileIntegrationLevel: "",
  usesRedirectionTo3rdParty: false,
  type: productType,
};
const productGroupType: "group" = "group";
const basePaymentProductGroupJSON: BasicPaymentProductGroupJSON = {
  allowsInstallments: false,
  deviceFingerprintEnabled: false,
  displayHints: {
    displayOrder: 0,
    logo: "",
  },
  id: "",
  type: productGroupType,
};
const baseAccountOnFile: AccountOnFileJSON = {
  attributes: [],
  displayHints: {
    logo: "",
    labelTemplate: [],
  },
  id: 0,
  paymentProductId: 0,
};

const products = new BasicPaymentProducts({
  paymentProducts: [
    Object.assign({}, basePaymentProductJSON, {
      id: 1,
      paymentMethod: "card",
      paymentProductGroup: "cards",
      accountsOnFile: [
        Object.assign({}, baseAccountOnFile, {
          id: 1,
          paymentProductId: 1,
        }),
      ],
    }),
    Object.assign({}, basePaymentProductJSON, {
      id: 302,
      paymentMethod: "mobile",
    }),
    Object.assign({}, basePaymentProductJSON, {
      id: 809,
      paymentMethod: "redirect",
    }),
    Object.assign({}, basePaymentProductJSON, {
      id: 2,
      paymentMethod: "card",
      paymentProductGroup: "cards",
      accountsOnFile: [
        Object.assign({}, baseAccountOnFile, {
          id: 2,
          paymentProductId: 2,
        }),
      ],
    }),
    Object.assign({}, basePaymentProductJSON, {
      id: 840,
      paymentMethod: "redirect",
      accountsOnFile: [
        Object.assign({}, baseAccountOnFile, {
          id: 3,
          paymentProductId: 840,
        }),
      ],
    }),
  ],
});
const groups = new BasicPaymentProductGroups({
  paymentProductGroups: [
    Object.assign({}, basePaymentProductGroupJSON, {
      id: "cards",
      accountsOnFile: [
        Object.assign({}, baseAccountOnFile, {
          id: 1,
          paymentProductId: 1,
        }),
        Object.assign({}, baseAccountOnFile, {
          id: 2,
          paymentProductId: 2,
        }),
      ],
    }),
  ],
});

describe("BasicPaymentItems", () => {
  test("without groups", () => {
    const items = new BasicPaymentItems(products);
    expect(items.basicPaymentItems.length).toBe(5);
    expect(items.basicPaymentItems[0].id).toBe(1);
    expect(items.basicPaymentItems[1].id).toBe(302);
    expect(items.basicPaymentItems[2].id).toBe(809);
    expect(items.basicPaymentItems[3].id).toBe(2);
    expect(items.basicPaymentItems[4].id).toBe(840);

    expect(items.basicPaymentItemById[1]).toBe(items.basicPaymentItems[0]);
    expect(items.basicPaymentItemById[302]).toBe(items.basicPaymentItems[1]);
    expect(items.basicPaymentItemById[809]).toBe(items.basicPaymentItems[2]);
    expect(items.basicPaymentItemById[2]).toBe(items.basicPaymentItems[3]);
    expect(items.basicPaymentItemById[840]).toBe(items.basicPaymentItems[4]);

    expect(items.accountsOnFile.length).toBe(3);
    expect(items.accountsOnFile[0].paymentProductId).toBe(1);
    expect(items.accountsOnFile[1].paymentProductId).toBe(2);
    expect(items.accountsOnFile[2].paymentProductId).toBe(840);

    expect(items.accountOnFileById[1]).toBe(items.accountsOnFile[0]);
    expect(items.accountOnFileById[2]).toBe(items.accountsOnFile[1]);
    expect(items.accountOnFileById[3]).toBe(items.accountsOnFile[2]);
  });

  test("with groups", () => {
    const items = new BasicPaymentItems(products, groups);

    expect(items.basicPaymentItems.length).toBe(4);
    expect(items.basicPaymentItems[0].id).toBe("cards");
    expect(items.basicPaymentItems[1].id).toBe(302);
    expect(items.basicPaymentItems[2].id).toBe(809);
    expect(items.basicPaymentItems[3].id).toBe(840);

    expect(items.basicPaymentItemById["cards"]).toBe(items.basicPaymentItems[0]);
    expect(items.basicPaymentItemById[302]).toBe(items.basicPaymentItems[1]);
    expect(items.basicPaymentItemById[809]).toBe(items.basicPaymentItems[2]);
    expect(items.basicPaymentItemById[840]).toBe(items.basicPaymentItems[3]);

    expect(items.accountsOnFile.length).toBe(3);
    expect(items.accountsOnFile[0].paymentProductId).toBe(1);
    expect(items.accountsOnFile[1].paymentProductId).toBe(2);
    expect(items.accountsOnFile[2].paymentProductId).toBe(840);

    expect(items.accountOnFileById[1]).toBe(items.accountsOnFile[0]);
    expect(items.accountOnFileById[2]).toBe(items.accountsOnFile[1]);
    expect(items.accountOnFileById[3]).toBe(items.accountsOnFile[2]);
  });
});
