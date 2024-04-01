import React from "react";
import BrandLogo from "../../../assets/brand_logo";
import { useNavigate } from "react-router-dom";
import Text from "../../elements/text";
import DashBoardUser from "../../../assets/dashboard_user";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth);

  return (
    <div className="dashboard-navbar-container">
      <BrandLogo width="50px" height="50px" />
      <div
        className="dashboard-navbar-user-container"
        onClick={() => navigate("/account")}
      >
        <Text content={userInfo?.name?.split(" ")[0]} color="#4527A0" m="0" />
        <DashBoardUser />
      </div>
    </div>
  );
};

export default Navbar;
