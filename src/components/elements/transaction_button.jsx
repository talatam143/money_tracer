import React from "react";
import "./elements.css";
import { useNavigate } from "react-router-dom";

const TransactionButton = React.memo(() => {
  const navigate = useNavigate();
  return (
    <button
      className="transaction-add-button"
      onClick={() => navigate("/new-transaction")}
    >
      New Transaction
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-playlist-add transaction-add-button-icon"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#FFFFFF"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 8h-14" />
        <path d="M5 12h9" />
        <path d="M11 16h-6" />
        <path d="M15 16h6" />
        <path d="M18 13v6" />
      </svg>
      <hr className="transaction-add-button-line" />
    </button>
  );
});

export default TransactionButton;
