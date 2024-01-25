import React from "react";
import { motion, useAnimation } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import Button from "./button";

const IconAnimation = (props) => {
  const { handleClickFunc, type, theme } = props;
  const animateHandlContainer = useAnimation();
  const animateHandleIcon = useAnimation();

  const showHandlePrompt = () => {
    animateHandlContainer.start({
      width: "90px",
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 460,
        damping: 35,
      },
    });
    animateHandleIcon.start({
      width: "0px",
      fontSize: "0px",
      transition: {
        duration: 0.2,
        type: "linear",
      },
    });
  };

  const hideHandlePrompt = () => {
    animateHandlContainer.start({
      width: "0",
      transition: {
        duration: 0.2,
        type: "linear",
      },
    });
    animateHandleIcon.start({
      fontSize: "26px",
      width: "fit-content",
      transition: {
        delay: 0,
      },
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <motion.div
        className="user-info-credit-delete-prompt-container"
        animate={animateHandlContainer}
      >
        <IoClose
          onClick={hideHandlePrompt}
          style={{
            fontSize: "30px",
            cursor: "pointer",
            background: theme ? "#ffffff" : "#121926",
            color: theme ? "#121926" : "#ffffff",
            borderRadius: "6px",
          }}
        />
        <Button
          content={type}
          color={
            type === "Delete" ? "#f44336" : type === "Edit" ? "#1e88e5" : null
          }
          backgroundColor={
            type === "Delete" ? "#f8b3ab" : type === "Edit" ? "#e3f2fd" : null
          }
          width="60px"
          height="30px"
          border="none"
          borderRadius="4px"
          fontWeight="500"
          fontSize="15px"
          handleClick={handleClickFunc}
        />
      </motion.div>
      <motion.div
        animate={animateHandleIcon}
        style={{ fontSize: "26px", overflow: "hidden", height: "32px" }}
      >
        {type === "Delete" ? (
          <MdDeleteForever
            onClick={showHandlePrompt}
            className="open-transaction-delete-icon"
          />
        ) : type === "Edit" ? (
          <GrEdit
            onClick={showHandlePrompt}
            className="open-transaction-edit-icon"
          />
        ) : null}
      </motion.div>
    </div>
  );
};

export default IconAnimation;
