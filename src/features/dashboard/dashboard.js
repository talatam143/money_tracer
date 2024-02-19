import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  charts: [],
  isFetched: false,
};

export const dashboardState = createSlice({
  name: "Dashboard State",
  initialState,
  reducers: {
    setDashboardState: (state, payload) => {
      state[payload.payload.type] = payload.payload.data;
      if (payload.payload.type === "charts") {
        state.isFetched = true;
      }
    },
    resetDashboardState: (state) => {
      state.analytics = [];
      state.charts = [];
      state.isFetched = false;
    },
  },
});

export const { setDashboardState, resetDashboardState } =
  dashboardState.actions;

export default dashboardState.reducer;
