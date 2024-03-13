import React, { lazy, useEffect, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { statesEnum } from "./utils/enums";
import { LinearProgress, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { resetSnackBar } from "./features/snackbar/snackbar";

const Login = lazy(() => import("./components/login/login"));
const Dashboard = lazy(() => import("./components/Dashboard/dashboard"));
const Transactions = lazy(() =>
  import("./components/transactions/transactions")
);
const Account = lazy(() => import("./components/Account/account"));
const Global = lazy(() => import("./components/global/global"));
const TransactionForm = lazy(() =>
  import("./components/transactions/transactionForm/transaction_form")
);

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

  function Loader() {
    return (
      <div id="suspense-loader">
        <svg viewBox="0 0 86 86" className="circle-outer">
          <circle r="40" cy="43" cx="43" className="back"></circle>
          <circle r="40" cy="43" cx="43" className="front"></circle>
          <circle r="40" cy="43" cx="43" className="new"></circle>
        </svg>
        <svg viewBox="0 0 60 60" className="circle-middle">
          <circle r="27" cy="30" cx="30" className="back"></circle>
          <circle r="27" cy="30" cx="30" className="front"></circle>
        </svg>
        <svg viewBox="0 0 34 34" className="circle-inner">
          <circle r="14" cy="17" cx="17" className="back"></circle>
          <circle r="14" cy="17" cx="17" className="front"></circle>
        </svg>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      {fetchState.state === statesEnum.LOADING &&
      window.location.pathname !== "/transactions" ? (
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
          <Route
            path="/transactions"
            element={<Navigate to="/transactions?monthly=true" replace />}
          />

          <Route path="/new-transaction" element={<TransactionForm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offline" element={<Global type="offline" />} />
          <Route path="/error" element={<Global type="error" />} />
          <Route path="/not-found" element={<Global type="notFound" />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
