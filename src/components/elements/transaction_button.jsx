import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./elements.css";
import { useNavigate } from "react-router-dom";

const TransactionButton = React.memo(() => {
  const [buttonText, setButtonText] = useState("New Transaction")
  useEffect(() => { setTimeout(() => setButtonText(""), 1500) }, [])
  const navigate = useNavigate();

  return (
    <motion.button
      className="transaction-add-button"
      onClick={() => navigate("/new-transaction")}
      initial={{ borderRadius: "8px" }}
      animate={{ borderRadius: "50px", width: "55px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 1.5
      }}
    >
      {buttonText}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-playlist-add transaction-add-button-icon"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#FFFFFF"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        display="block"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 8h-14" />
        <path d="M5 12h9" />
        <path d="M11 16h-6" />
        <path d="M15 16h6" />
        <path d="M18 13v6" />
      </svg>
    </motion.button>
  );
});

export default TransactionButton;
