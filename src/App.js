import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/login/login";
import Dashboard from "./components/Dashboard/dashboard";
import Transactions from "./components/transactions/transactions";
import Account from "./components/Account/account";
import { statesEnum } from "./utils/enums";
import { LinearProgress, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { resetSnackBar } from "./features/snackbar/snackbar";
import Global from "./components/global/global";
import TransactionForm from "./components/transactions/transactionForm/transaction_form";

const App = () => {
  const fetchState = useSelector((state) => state.fetchState);
  const snackBar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(resetSnackBar());
  };

  useEffect(() => {
    const handleOnlineStatus = () => {
      if (!navigator.onLine) {
        window.location.href = "/offline";
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <>
      {fetchState.state === statesEnum.LOADING ? (
        <LinearProgress
          color="inherit"
          sx={{ position: "sticky", width: "100%", top: 0 }}
        />
      ) : null}
      <Snackbar
        open={snackBar.snackBarState}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackBar.snackBarSeverity}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {snackBar.snackBarText}
        </MuiAlert>
      </Snackbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/new-transaction" element={<TransactionForm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offline" element={<Global type="offline" />} />
          <Route path="/error" element={<Global type="error" />} />
          <Route path="/not-found" element={<Global type="notFound" />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
