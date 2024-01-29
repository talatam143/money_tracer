import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { MdSaveAs } from "react-icons/md";
import Button from "./button";

const IconAnimation = (props) => {
  const { handleClickFunc, type, theme } = props;
  const [iconColor, setIconCOlor] = useState({ dark: "", light: "" });
  const animateHandlContainer = useAnimation();
  const animateHandleIcon = useAnimation();

  useEffect(() => {
    switch (type) {
      case "Delete":
      case "Discard":
        setIconCOlor({ dark: "#f44336", light: "#f8b3ab" });
        break;
      case "Edit":
        setIconCOlor({ dark: "#1e88e5", light: "#e3f2fd" });
        break;
      case "Draft":
        setIconCOlor({ dark: "#FFC107", light: "#FFF8E1" });
        break;
      default:
        break;
    }
  }, [type]);

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

  const Icon = () => {
    switch (type) {
      case "Delete":
      case "Discard":
        return (
          <MdDeleteForever
            onClick={showHandlePrompt}
            className="open-transaction-animate-icon delet-icon"
          />
        );

      case "Edit":
        return (
          <GrEdit
            onClick={showHandlePrompt}
            className="open-transaction-animate-icon edit-icon"
          />
        );
      case "Draft":
        return (
          <MdSaveAs
            onClick={showHandlePrompt}
            className="open-transaction-animate-icon draft-icon"
          />
        );
      default:
        break;
    }
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
          color={iconColor.dark}
          backgroundColor={iconColor.light}
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
        <Icon />
      </motion.div>
    </div>
  );
};

export default IconAnimation;
