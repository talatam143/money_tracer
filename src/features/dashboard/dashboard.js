import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  charts: [],
  isAnalyticsFetched: false,
  isChartsAvailable: false,
  isChartsFetched: false,
};

export const dashboardState = createSlice({
  name: "Dashboard State",
  initialState,
  reducers: {
    setDashboardState: (state, payload) => {
      state[payload.payload.type] = payload.payload.data;
      if (payload.payload.type === "transactions") {
        state.isAnalyticsFetched = true;
        state.isChartsAvailable = payload.payload.isChartsAvailable;
      } else if (payload.payload.type === "charts") {
        state.isChartsFetched = true;
      }
    },
    resetDashboardState: (state) => {
      state.analytics = [];
      state.charts = [];
      state.isAnalyticsFetched = false;
      state.isChartsFetched = false;
      state.isChartsAvailable = false;
    },
  },
});

export const { setDashboardState, resetDashboardState } =
  dashboardState.actions;

export default dashboardState.reducer;
