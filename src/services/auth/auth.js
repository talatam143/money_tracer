import axios from "axios";
import { store } from "../../store";
import { setUserLogin, setUserLogout } from "../../features/auth/auth";
import {
  setErrorState,
  setLoadingState,
  setSuccessState,
} from "../../features/fetch_state/fetch_state";
import { showSnackBar } from "../../features/snackbar/snackbar";

const serverUrl = `${process.env.REACT_APP_SERVER_URL}auth`;

export const userAuthService = async (formData, method, path) => {
  store.dispatch(setLoadingState());
  try {
    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: `${serverUrl}${path}`,
    };
    if (method === "get") {
      const token = localStorage.getItem("userId");
      config.headers = {
        Authorization: `bearer ${token}`,
      };
    } else {
      config.headers = {
        "Content-Type": "application/json",
      };
      let data = JSON.stringify(formData);
      config.data = data;
    }

    const response = await axios.request(config);
    store.dispatch(setSuccessState());
    if (path !== "/") {
      store.dispatch(
        showSnackBar({
          message: response?.data?.data?.message,
          severity: "success",
        })
      );
    }
    if (["/login", "/verifyUser", "/"].includes(path)) {
      store.dispatch(setUserLogin(response?.data?.data));
    }
    return { status: response?.status, data: response?.data?.data };
  } catch (error) {
    console.log(error);
    store.dispatch(setErrorState());
    store.dispatch(
      showSnackBar({
        message: error?.response?.data?.data?.errorMessage,
        severity: "error",
      })
    );
    if (path === "/") store.dispatch(setUserLogout());
    return {
      status: error?.response?.status,
      data: error?.response?.data?.data,
    };
  }
};
