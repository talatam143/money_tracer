import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTransactionDrafted: false,
  transactionObj: {
    title: "",
    description: "",
    amount: "",
    category: "reset",
    paymentMethod: "reset",
    paymentInfo: "reset",
    bank: "reset",
    transactionDate: `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    starred: false,
    members: "",
    tags: "",
  },
  membersObj: { members: [], tags: [] },
};

export const transactionsFormSlice = createSlice({
  name: "Transaction Form",
  initialState,
  reducers: {
    draftTransactionForm: (state, payload) => {
      state.isTransactionDrafted = true;
      state.transactionObj = payload?.payload.transactionObj;
      state.membersObj = payload?.payload.membersObj;
    },
    resetTransactionForm: (state) => {
      state.isTransactionDrafted = false;
      state.transactionObj = initialState.transactionObj;
      state.membersObj = initialState.membersObj;
    },
  },
});

export const { draftTransactionForm, resetTransactionForm } =
  transactionsFormSlice.actions;

export default transactionsFormSlice.reducer;
