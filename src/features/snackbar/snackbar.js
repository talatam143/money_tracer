import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackBarState: false,
  snackBarText: "",
  snackBarSeverity: "info",
};

export const snackBarState = createSlice({
  name: "Snackbar",
  initialState,
  reducers: {
    showSnackBar: (state, payload) => {
      state.snackBarState = true;
      state.snackBarText = payload.payload.message;
      state.snackBarSeverity = payload.payload.severity;
      if (payload.payload.severity === "error" && !payload.payload.message) {
        state.snackBarText = "Something went wrong";
      }
    },
    resetSnackBar: (state) => {
      state.snackBarState = false;
      state.snackBarText = "";
    },
  },
});

export const { showSnackBar, resetSnackBar } = snackBarState.actions;

export default snackBarState.reducer;
