import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Text from "../elements/text";
import Button from "../elements/button";
import "./global.css";
import OfflineLogo from "../../assets/offline_logo";
import ErrorLogo from "../../assets/error_logo";
import NotFound from "../../assets/notFound_logo";
import { setUserLogout } from "../../features/auth/auth";

const Global = (props) => {
  const { type } = props;
  const [textContent, setTextContent] = useState("");
  const [buttonContent, setButtonContent] = useState("");
  const userAuth = useContext((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "offline") {
      setTextContent(
        "Oops! It looks like you're offline. Please check your internet connection and try again. 🌐"
      );
      setButtonContent("Reload");
    } else if (type === "error") {
      setTextContent(
        "We apologize for the inconvenience. It seems that there was an issue on our website."
      );
      setButtonContent("Try again");
    } else if (type === "notFound") {
      setTextContent(
        "Sorry but the page you are looking for does not exist or have been removed. Name changed or is temporarily unavailable"
      );
      setButtonContent("Go Home");
    }
  }, [type]);

  useEffect(() => {
    navigator.onLine && type === "offline" && navigate(-1);
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        navigate(-1);
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnlineStatus = () => {
    if (type === "notFound") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    dispatch(setUserLogout());
    navigate("/login");
  };

  const Logo = () => {
    switch (type) {
      case "offline":
        return <OfflineLogo />;
      case "error":
        return <ErrorLogo />;
      case "notFound":
        return <NotFound />;
      default:
        break;
    }
  };

  return (
    <div className="offline-container">
      <Logo />
      <Text
        content={textContent}
        color="#000000"
        size="24px"
        weight="600"
        align="center"
        m="5px 0 25px 0"
      />
      <Button
        content={buttonContent}
        backgroundColor="#000000"
        color="#ffffff"
        border="none"
        borderRadius="8px"
        width="100px"
        height="40px"
        fontSize="20px"
        handleClick={handleOnlineStatus}
      />
      {type === "error" && userAuth?.isUserLoggedIn ? (
        <Button
          content="Logout"
          backgroundColor="#000000"
          color="#ffffff"
          border="none"
          borderRadius="8px"
          width="100px"
          height="40px"
          fontSize="20px"
          margin="10px 0 0 0"
          handleClick={handleLogout}
        />
      ) : null}
    </div>
  );
};

export default Global;
