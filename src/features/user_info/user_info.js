import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDataFetched: false,
  userData: { bankData: [], upiData: [], creditCardData: [] },
};

export const userInfoSlice = createSlice({
  name: "User Data",
  initialState,
  reducers: {
    setUserData: (state, payload) => {
      let data = payload.payload;
      state.isDataFetched = true;
      if (data?.bankDetails) state.userData.bankData = data.bankDetails;
      if (data?.upiDetails) state.userData.upiData = data.upiDetails;
      if (data?.creditCardsDetails)
        state.userData.creditCardData = data.creditCardsDetails;
    },
    resetUserData: (state) => {
      state = initialState;
    },
  },
});

export const { setUserData, resetUserData } = userInfoSlice.actions;

export default userInfoSlice.reducer;
