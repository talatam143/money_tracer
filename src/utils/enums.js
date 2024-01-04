export const statesEnum = Object.freeze({
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});

export const userDataEnums = Object.freeze([
  { name: "Banks", reduxStoreVar: "bankData" },
  { name: "UPI", reduxStoreVar: "upiData" },
  { name: "Credit Cards", reduxStoreVar: "creditCardData" },
]);
