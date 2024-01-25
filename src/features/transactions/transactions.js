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
    updateTransacions: (state, payload) => {
      let { transactionsCount, transactions } = payload.payload;
      state.isDataFetched = true;
      state.transactionsCount = transactionsCount;
      state.transactions = transactions;
    },
    resetTransactionsData: (state) => {
      state.isDataFetched = false;
      state.transactionsCount = 0;
      state.transactions = [];
    },
  },
});

export const { setTransactionsData, resetTransactionsData, updateTransacions } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
