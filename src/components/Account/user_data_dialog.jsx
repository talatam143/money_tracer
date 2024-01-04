import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { useSelector } from "react-redux";
import NoData from "../../assets/no_data";
import Text from "../elements/text";
import Button from "../elements/button";
import UserDataCard from "./user_data_card";

const UserDataDialog = (props) => {
  const { toggleDialog, type } = props;
  const userData = useSelector((state) => state.userData.userData);

  const NoInfo = () => {
    return (
      <div className="userdata-noinfo-container">
        <NoData />
        <Text
          content={`Looks like you haven't added any ${type.name.toLowerCase()} details yet. Click "Add" to add your bank information.`}
          weight="500"
          size="18px"
        />
      </div>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <IoMdCloseCircleOutline
        onClick={toggleDialog}
        className="close-dialog-icon"
      />

      {type ? (
        <>
          <Text
            content={type.name}
            size="28px"
            weight="600"
            m="15px 0 0 20px"
          />
          {userData[type.reduxStoreVar].length > 0 ? (
            <div className="userdata-cards-container">
              {userData[type.reduxStoreVar].map((eachItem) => (
                <UserDataCard type={type} item={eachItem} key={eachItem.name} />
              ))}
            </div>
          ) : (
            <NoInfo />
          )}
          <div className="userdata-add-button">
            <Button
              content="Add"
              backgroundColor="black"
              color="#FFFFFF"
              fontSize="24px"
              border="none"
              borderRadius="8px"
              padding="0 0 0 14px"
              height="38px"
              icon="add"
              iconPosition="end"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserDataDialog;
