export const statesEnum = Object.freeze({
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});

export const userDataEnums = Object.freeze([
  {
    name: "Banks",
    reduxStoreVar: "bankData",
    dbVar: "bank_details",
    rawvar: "bankRawData",
  },
  {
    name: "UPI",
    reduxStoreVar: "upiData",
    dbVar: "upi_app",
    rawvar: "upiRawData",
  },
  {
    name: "Credit Cards",
    reduxStoreVar: "creditCardData",
    dbVar: "credit_cards",
    rawvar: "creditCardsRawData",
  },
]);
