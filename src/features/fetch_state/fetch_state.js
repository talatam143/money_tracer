import { createSlice } from "@reduxjs/toolkit";
import { statesEnum } from "../../utils/enums";

const initialState = {
  state: statesEnum.INITIAL,
  message: "",
};

export const fetchState = createSlice({
  name: "Fetch State",
  initialState,
  reducers: {
    setLoadingState: (state) => {
      state.state = statesEnum.LOADING;
    },
    setSuccessState: (state) => {
      state.state = statesEnum.SUCCESS;
    },
    setErrorState: (state) => {
      state.state = statesEnum.ERROR;
    },
    resetState: (state) => {
      state.state = statesEnum.INITIAL;
    },
  },
});

export const { setLoadingState, setSuccessState, setErrorState, resetState } =
  fetchState.actions;

export default fetchState.reducer;
