import React, { useEffect } from "react";
import Text from "../elements/text";
import Button from "../elements/button";
import "./global.css";
import { useNavigate } from "react-router-dom";
import OfflineLogo from "../../assets/offline_logo";

const Offline = () => {
  const naviagte = useNavigate();

  useEffect(() => {
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naviagte]);

  const handleOnlineStatus = () => {
    if (navigator.onLine) {
      naviagte(-1);
    }
  };

  return (
    <div className="offline-container">
      <OfflineLogo />
      <Text
        content="Oops! It looks like you're offline. Please check your internet connection and try again. 🌐"
        color="#000000"
        size="24px"
        weight="600"
        align="center"
        m="5px 0 25px 0"
      />
      <Button
        content="Reload"
        backgroundColor="#000000"
        color="#ffffff"
        border="none"
        borderRadius="8px"
        width="100px"
        height="40px"
        fontSize="20px"
        handleClick={handleOnlineStatus}
      />
    </div>
  );
};

export default Offline;
