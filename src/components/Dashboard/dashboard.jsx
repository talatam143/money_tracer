import React from "react";
import Menu from "../home/menu";
import TransactionButton from "../elements/transaction_button";

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <TransactionButton />
      <Menu />
    </div>
  );
};

export default Dashboard;
