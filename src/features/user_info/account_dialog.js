import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogType: {},
};

export const accountDialogInfo = createSlice({
  name: "Account dialog",
  initialState,
  reducers: {
    setDialogType: (state, payload) => {
      state.dialogType = payload.payload;
    },
    resetDialogType: (state) => {
      state.dialogType = {};
    },
  },
});

export const { setDialogType, resetDialogType } = accountDialogInfo.actions;

export default accountDialogInfo.reducer;
