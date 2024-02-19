import React from "react";
import { FiMail } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import UserLogo from "../../assets/user_logo";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const Profilecard = () => {
  const user = useSelector((state) => state.auth);

  return user.isUserLoggedIn ? (
    <>
      <div className="account-profile-logo-container">
        <UserLogo />
      </div>
      <div className="account-profile-info-container">
        <p className="account-user-name">{user?.name ? user.name : "User"}</p>
        <div className="account-user-details-container">
          <FiMail style={{ fontSize: "20px" }} />
          <span className="account-user-details">
            {user?.email ? user.email : "N/A"}
          </span>
        </div>
        {user?.mobileNumber ? (
          <div className="account-user-details-container">
            <FaPhone style={{ fontSize: "20px" }} />
            <span className="account-user-details">
              {user?.mobileNumber ? `+91 ${user.mobileNumber}` : "N/A"}
            </span>
          </div>
        ) : null}
      </div>
    </>
  ) : (
    <>
      <Skeleton variant="circular" width={70} height={70} animation="wave" />
      {["0", "1"].map((eachItem) => (
        <Skeleton
          key={eachItem}
          variant="rectangular"
          width="100%"
          height={40}
          animation="wave"
          sx={{ mt: 1, borderRadius: "10px" }}
        />
      ))}
    </>
  );
};

export default Profilecard;
