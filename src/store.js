import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/auth";
import fetchStateReducer from "./features/fetch_state/fetch_state";
import snackbarReducer from "./features/snackbar/snackbar";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fetchState: fetchStateReducer,
    snackbar: snackbarReducer,
  },
});
