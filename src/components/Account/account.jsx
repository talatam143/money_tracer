import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setUserLogout } from "../../features/auth/auth";
import "./account_styles.css";
import Menu from "../home/menu";
import Profilecard from "./profile_card";
import PaymentInfoCard from "./paymentInfo_cards";
import Button from "../elements/button";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUserLogout());
    navigate("/login");
  };

  const container = {
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

  const item = {
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
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="account-profile-container" variants={item}>
          <Profilecard />
        </motion.div>

        <div className="account-payment-container">
          <motion.div
            variants={item}
            className="account-payement-sub-container"
          >
            <PaymentInfoCard />
          </motion.div>
          <motion.div
            variants={item}
            className="account-payement-sub-container"
          >
            <PaymentInfoCard />
          </motion.div>
          <motion.div
            variants={item}
            className="account-payement-sub-container"
          >
            <PaymentInfoCard />
          </motion.div>
        </div>
        <motion.div variants={item}>
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
      </motion.div>
      <Menu />
    </>
  );
};

export default Account;
