import React from "react";
import { AiOutlineExpandAlt, AiOutlineQrcode,AiTwotoneBank } from "react-icons/ai";
import { BsCreditCard2Front } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const PaymentInfoCard = (props) => {
  const { type } = props;
  const user = useSelector((state) => state.auth);

  const Icon = () => {
    const iconSize = {
      fontSize: "45px",
      marginTop: "10px",
      marginLeft: type === "Credit Cards" ? "8px" : "3px",
    };
    switch (type) {
      case "Banks":
        return <AiTwotoneBank style={iconSize} />;
      case "UPI":
        return <AiOutlineQrcode style={iconSize} />;
      case "Credit Cards":
        return <BsCreditCard2Front style={iconSize} />;

      default:
        break;
    }
  };

  return user.isUserLoggedIn ? (
    <>
      <Icon />
      <AiOutlineExpandAlt className="account-expand-icon" />
      <p className="account-payment-header">{type}</p>
    </>
  ) : (
    <>
      <Skeleton
        variant="rectangular"
        width={80}
        height={70}
        animation="wave"
        sx={{ mt: 1, borderRadius: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={35}
        animation="wave"
        sx={{ mt: 1, borderRadius: "10px" }}
      />
    </>
  );
};

export default PaymentInfoCard;
