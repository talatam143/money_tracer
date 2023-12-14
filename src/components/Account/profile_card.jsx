import React from "react";
import { FiMail } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import UserLogo from "../../assets/user_logo";

const Profilecard = () => {
  return (
    <>
      <div className="account-profile-logo-container">
        <UserLogo />
      </div>
      <div className="account-profile-info-container">
        <p className="account-user-name">Manikanta</p>
        <div className="account-user-details-container">
          <FiMail style={{ fontSize: "22px" }} />
          <span className="account-user-details">
            contact2manikanta@gmail.com
          </span>
        </div>
        <div className="account-user-details-container">
          <FaPhone style={{ fontSize: "22px" }} />
          <span className="account-user-details">+91 80566 77189</span>
        </div>
      </div>
    </>
  );
};

export default Profilecard;
