import axios from "axios";
import { store } from "../../store";
import {
  setErrorState,
  setLoadingState,
  setSuccessState,
} from "../../features/fetch_state/fetch_state";
import { showSnackBar } from "../../features/snackbar/snackbar";

const serverUrl = `${process.env.REACT_APP_SERVER_URL}user`;

export const userInfoService = async (formData, method, path) => {
  store.dispatch(setLoadingState());
  try {
    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: `${serverUrl}${path}`,
      headers: {},
    };
    if (method === "get" || "delete") {
      const token = localStorage.getItem("userId");
      config.headers.Authorization = `bearer ${token}`;
    }
    if (method !== "get") {
      config.headers["Content-Type"] = "application/json";
      let data = JSON.stringify(formData);
      config.data = data;
    }

    const response = await axios.request(config);
    store.dispatch(setSuccessState());
    if (path !== "/getuserdetails") {
      store.dispatch(
        showSnackBar({
          message: response?.data?.data?.message,
          severity: "success",
        })
      );
    }
    return { status: response?.status, data: response?.data?.data };
  } catch (error) {
    store.dispatch(setErrorState());
    if (
      error?.response?.status &&
      [400, 401, 404, 422, 500].includes(error?.response?.status)
    ) {
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
