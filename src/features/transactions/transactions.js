import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataFetched: false,
  transactionsCount: 0,
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: "Transactions Data",
  initialState,
  reducers: {
    setTransactionsData: (state, payload) => {
      let { transactionsCount, transactions } = payload.payload;
      state.isDataFetched = true;
      state.transactionsCount = transactionsCount;
      state.transactions = [...state.transactions, ...transactions];
    },
    updateTransactionsData: (state, payload) => {
      let { transactionsCount, transactions } = payload.payload;
      state.isDataFetched = true;
      state.transactionsCount = transactionsCount;
      state.transactions = [...[], ...transactions];
    },
    updateEditTransaction: (state, payload) => {
      let updatedTransaction = payload?.payload?.data;
      let transactions = state.transactions;

      const foundIndex = transactions?.findIndex(
        (obj) => obj?._id === updatedTransaction?._id
      );
      if (foundIndex !== -1) {
        transactions[foundIndex] = updatedTransaction;
      }
      state.transactions = transactions;
    },
    resetTransactionsData: (state) => {
      state.isDataFetched = false;
      state.transactionsCount = 0;
      state.transactions = [];
    },
  },
});

export const {
  setTransactionsData,
  resetTransactionsData,
  updateTransactionsData,
  updateEditTransaction,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
