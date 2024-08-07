import axios from "axios";
import { store } from "../../store";
import {
  setErrorState,
  setLoadingState,
  setSuccessState,
} from "../../features/fetch_state/fetch_state";
import { showSnackBar } from "../../features/snackbar/snackbar";
import { setDashboardState } from "../../features/dashboard/dashboard";

const serverUrl = `${process.env.REACT_APP_SERVER_URL}analytics`;

export const dashboardService = async (method, path) => {
  store.dispatch(setLoadingState());
  try {
    const token = localStorage.getItem("userId");
    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: `${serverUrl}${path}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    store.dispatch(setSuccessState());
    if (response.status === 200) {
      store.dispatch(
        setDashboardState({
          data: response.data.data,
          type: path?.split("?")?.[0]?.slice(1),
          isChartsAvailable: response?.data?.isChartsAvailable,
        })
      );
    }
    return {
      status: response?.status,
    };
  } catch (error) {
    store.dispatch(setErrorState());
    if (error?.response?.status && [500].includes(error?.response?.status)) {
      store.dispatch(
        showSnackBar({
          message: error?.response?.data?.data?.errorMessage,
          severity: "error",
        })
      );
    } else {
      window.location.href = "/error";
    }
    return {
      status: error?.response?.status,
      data: error?.response?.data?.data,
    };
  }
};
