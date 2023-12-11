import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  email: "",
  name: "",
  mobileNumber: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserLogin: (state, payload) => {
      state.isUserLoggedIn = true;
      state.email = payload.payload.email;
      state.name = payload.payload.name;
      state.mobileNumber = payload.payload.mobileNumber;
      if (payload.payload.token) {
        localStorage.setItem("userId", payload.payload.token);
      }
    },
    setUserLogout: (state) => {
      localStorage.removeItem("userId");
      state = initialState;
    },
  },
});

export const { setUserLogin, setUserLogout } = authSlice.actions;

export default authSlice.reducer;
