import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { setUserLogout } from "../../features/auth/auth";
import "./account_styles.css";
import Menu from "../home/menu";
import Profilecard from "./profile_card";
import PaymentInfoCard from "./paymentInfo_cards";
import Button from "../elements/button";
import { userInfoService } from "../../services/user/user_info";
import { resetUserData, setUserData } from "../../features/user_info/user_info";
import UserDataDialog from "./user_data_dialog";
import { userDataEnums } from "../../utils/enums";
import { formatUserData } from "../../utils/format_user_data";
import { resetSnackBar } from "../../features/snackbar/snackbar";
import { resetTransactionForm } from "../../features/transactions/transaction_form";
import { resetState } from "../../features/fetch_state/fetch_state";
import { resetTransactionsData } from "../../features/transactions/transactions";
import { resetDashboardState } from "../../features/dashboard/dashboard";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerAnimation = useAnimation();
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [dialogDataType, setDialogDataType] = useState(userDataEnums[0]);
  const userData = useSelector((state) => state.userData);

  const handleLogout = () => {
    dispatch(resetUserData());
    dispatch(resetSnackBar());
    dispatch(resetTransactionForm());
    dispatch(resetState());
    dispatch(resetTransactionsData());
    dispatch(setUserLogout());
    dispatch(resetDashboardState());
    navigate("/login");
  };

  const accountContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.09,
      },
    },
  };

  const toggleDialog = async (method) => {
    if (method) {
      setDialogDataType(
        userDataEnums.find((eachData) => eachData.name === method.name)
      );
    }
    if (userData.isDataFetched) {
      setShowDetailsDialog((prevState) => !prevState);
      animateContainer();
    } else if (!userData.isDataFetched && !showDetailsDialog) {
      const { status, data } = await userInfoService(
        {},
        "get",
        "/getuserdetails"
      );
      if (status === 200) {
        let formattedData = formatUserData(data);
        dispatch(setUserData(formattedData));
        setShowDetailsDialog(true);
        animateContainer();
      }
    }
  };

  const animateContainer = () => {
    containerAnimation.start({
      width: !showDetailsDialog ? "calc(100% - 40px)" : 0,
      transition: { delay: !showDetailsDialog ? 0 : 0.36, duration: 0 },
    });
    containerAnimation.start({
      height: !showDetailsDialog ? "calc(100% - 90px)" : 0,
      top: !showDetailsDialog ? "20px" : "50%",
      transition: {
        duration: !showDetailsDialog ? 0.4 : 0.35,
        type: !showDetailsDialog ? "spring" : "linear",
        stiffness: 460,
        damping: 30,
        delay: !showDetailsDialog ? 0.1 : 0,
      },
    });
  };

  const accountItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <motion.div
        className="account-container"
        variants={accountContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="account-profile-container"
          variants={accountItem}
        >
          <Profilecard />
        </motion.div>
        <div className="account-payment-container">
          {userDataEnums.map((eachItem) => (
            <motion.div
              variants={accountItem}
              className="account-payement-sub-container"
              key={eachItem.name}
            >
              <PaymentInfoCard method={eachItem} toggleDialog={toggleDialog} />
            </motion.div>
          ))}
        </div>
        <motion.div variants={accountItem}>
          <Button
            content="Logout"
            backgroundColor="#000000"
            color="#ffffff"
            border="none"
            borderRadius="8px"
            width="100%"
            height="50px"
            fontSize="20px"
            margin="50px 0 0 0"
            handleClick={handleLogout}
          />
        </motion.div>
        <motion.div
          className={
            showDetailsDialog
              ? "account-dialog-container show-opacity"
              : "account-dialog-container hide-opacity"
          }
          animate={containerAnimation}
        >
          <UserDataDialog
            toggleDialog={toggleDialog}
            type={dialogDataType}
            state={showDetailsDialog}
          />
        </motion.div>
      </motion.div>
      <Menu />
    </>
  );
};

export default Account;
