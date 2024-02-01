import React from "react";
import Menu from "../home/menu";
import TransactionButton from "../elements/transaction_button";
import NewUserDashBoard from "./new_user/dashboard";

const Dashboard = () => {
  return (
    <>
      <NewUserDashBoard />
      <TransactionButton />
      <Menu />
    </>
  );
};

export default Dashboard;
