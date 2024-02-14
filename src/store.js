import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/auth";
import fetchStateReducer from "./features/fetch_state/fetch_state";
import snackbarReducer from "./features/snackbar/snackbar";
import userDataReducer from "./features/user_info/user_info";
import transactionDatReducer from "./features/transactions/transactions";
import transactionFormReducer from "./features/transactions/transaction_form";
import dashBoardReducer from "./features/dashboard/dashboard";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fetchState: fetchStateReducer,
    snackbar: snackbarReducer,
    userData: userDataReducer,
    transactionData: transactionDatReducer,
    transactionForm: transactionFormReducer,
    dashboard: dashBoardReducer,
  },
});
