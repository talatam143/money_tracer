import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { userDataEnums } from "../../utils/enums";
import Text from "../elements/text";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdDelete, MdOutlineContactless } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";

const UserDataCard = (props) => {
  const { type, item } = props;
  const [deleteName, setDeleteName] = useState("");
  const deleteButtonAnimation = useAnimation();

  const handleDeleteCard = (name) => {
    setDeleteName(name);
    deleteButtonAnimation.start({
      width: "200px",
      transition: {
        duration: 0.4,
        type: "linear",
      },
    });
  };

  switch (type.name) {
    case userDataEnums[0].name:
      return (
        <div className="user-info-bank-card">
          <img
            src={item.imageUrl}
            alt="bank-logo"
            className="user-info-bank-logo"
          />
          <Text content={item.name} m="8px 0 0 0" size="17px" weight="600" />
        </div>
      );
    case userDataEnums[1].name:
      return (
        <div className="user-info-upi-card">
          <img
            src={item.imageUrl}
            alt="upi-logo"
            className="user-info-upi-logo"
          />
          <Text content={item.name} m="5px 0 0 0" size="17px" weight="600" />
        </div>
      );
    case userDataEnums[2].name:
      return (
        <div className="user-info-credit-card">
          <div className="user-info-credit-title-container">
            <div style={{ width: "88%" }}>
              <BsCreditCard2Front style={{ fontSize: "36px" }} />
              <Text content={item.name} m="0" size="16px" weight="600" />
            </div>
            <MdOutlineContactless style={{ fontSize: "36px" }} />
          </div>
          <div>
            <div>
              <Text content="xxxx xxxx xxxx 1234" m="0" size="16px" />
              <Text content="xx / xx" m="0" size="16px" />
            </div>
            <MdDelete />
          </div>
        </div>
      );
    default:
      break;
  }
};

export default UserDataCard;
