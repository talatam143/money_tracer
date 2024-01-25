import React from "react";
import { useDispatch } from "react-redux";
import { userDataEnums } from "../../utils/enums";
import Text from "../elements/text";
import { MdOutlineContactless } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { userInfoService } from "../../services/user/user_info";
import { formatUserData } from "../../utils/format_user_data";
import { setUserData } from "../../features/user_info/user_info";
import IconAnimation from "../elements/icon_animation";

const UserDataCard = (props) => {
  const { type, item } = props;
  const dispatch = useDispatch();

  const handleDeleteData = async () => {
    const { status, data } = await userInfoService(
      { data: [item.name], dbVar: type.dbVar },
      "delete",
      "/deleteuserdata"
    );
    if (status === 200) {
      let formattedData = formatUserData(data);
      dispatch(setUserData(formattedData));
    }
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
          <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
            <IconAnimation
              handleClickFunc={handleDeleteData}
              type="Delete"
            />
          </div>
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
          <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
            <IconAnimation
              handleClickFunc={handleDeleteData}
              type="Delete"
            />
          </div>
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
          <div className="user-info-credit-card-number-container">
            <div style={{ flexGrow: "1" }}>
              <Text content="xxxx xxxx xxxx 1234" m="0" size="16px" />
              <Text content="xx / xx" m="0" size="16px" />
            </div>
            <IconAnimation
              handleClickFunc={handleDeleteData}
              type="Delete"
            />
          </div>
        </div>
      );
    default:
      break;
  }
};

export default UserDataCard;
