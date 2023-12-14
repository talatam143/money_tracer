import React from "react";
import { CiBank } from "react-icons/ci";
import { AiOutlineExpandAlt } from "react-icons/ai";

const PaymentInfoCard = () => {
  return (
    <>
      <CiBank style={{ fontSize: "70px", marginTop: "10px" }} />
      <AiOutlineExpandAlt className="account-expand-icon" />
      <p className="account-payment-header">Banks</p>
    </>
  );
};

export default PaymentInfoCard;
