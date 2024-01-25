import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { IoIosAddCircleOutline, IoIosCloseCircle } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../assets/no_data";
import Text from "../elements/text";
import Button from "../elements/button";
import UserDataCard from "./user_data_card";
import InputField from "../elements/input_field";
import { allRawData } from "../../utils/raw_data";
import { userInfoService } from "../../services/user/user_info";
import { setUserData } from "../../features/user_info/user_info";
import { formatUserData } from "../../utils/format_user_data";

const UserDataDialog = (props) => {
  const { toggleDialog, type } = props;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    let allData = allRawData?.[type?.rawvar];
    let destructuredObj = userData[type.reduxStoreVar].map((data) => {
      return data.name;
    });
    setRawData(
      allData.filter((eachData) => !destructuredObj.includes(eachData))
    );
    return () => {
      setRawData([]);
      setSearchValue("");
      setSearchResults([]);
      setSelectedResults([]);
    };
  }, [type, userData]);

  const dataContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.12,
      },
    },
  };

  const dataItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleMinimizeDialog = () => {
    toggleDialog();
    setEnableSearch(false);
  };

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

  const handleSearchData = (e) => {
    setSearchValue(e.target.value);
    let filteredData = rawData.filter((eachData) =>
      eachData.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length === 0) {
      setSearchResults([]);
    } else {
      setSearchResults(filteredData);
    }
  };

  const handleSelectData = (data) => {
    setSearchValue("");
    let checkDataWSelected = selectedResults.filter(
      (eachData) => eachData.toLowerCase() === data.toLowerCase()
    );
    let checkDataWithUser = userData[type.reduxStoreVar].filter(
      (eachItem) => eachItem.name.toLowerCase() === data.toLowerCase()
    );
    if (checkDataWSelected.length === 0 && checkDataWithUser.length === 0) {
      if (!selectedResults.includes(data)) {
        setSelectedResults((prevData) => [...prevData, data]);
        setRawData(rawData.filter((eachRaw) => data !== eachRaw));
        setSearchResults(
          searchResults.filter((eachSearch) => data !== eachSearch)
        );
      }
    }
  };

  const handleDeleteSelected = (data) => {
    setSelectedResults(selectedResults.filter((eachRes) => data !== eachRes));
    setRawData((prevData) => [...prevData, data]);
  };

  const updateData = async () => {
    const { status, data } = await userInfoService(
      { dbVar: type.dbVar, data: selectedResults },
      "put",
      "/adduserdata"
    );
    if (status === 200) {
      let formattedData = formatUserData(data);
      dispatch(setUserData(formattedData));
      setEnableSearch(false);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <TbArrowsDiagonalMinimize2
        onClick={handleMinimizeDialog}
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
          {enableSearch ? (
            <>
              <div className="user-info-search-container">
                <InputField
                  type="search"
                  height="35px"
                  placeholder={`Search ${type.name}`}
                  icon="search"
                  width="100%"
                  margin="0"
                  onChange={handleSearchData}
                  value={searchValue}
                />
                <CiSquareRemove
                  style={{
                    fontSize: "35px",
                    margin: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => setEnableSearch(false)}
                />
              </div>
              <div className="user-info-search-result-container">
                {searchResults.map((eachRes) => (
                  <div
                    key={eachRes}
                    className="user-info-each-result-container"
                  >
                    <p className="user-info-each-result-para">{eachRes}</p>
                    <IoIosAddCircleOutline
                      className="user-info-each-result-icon"
                      onClick={() => handleSelectData(eachRes)}
                    />
                  </div>
                ))}
                {searchValue.trim().length > 0 ? (
                  <div className="user-info-each-result-container">
                    <p className="user-info-each-result-para">
                      {searchValue} (Other's)
                    </p>
                    <IoIosAddCircleOutline
                      className="user-info-each-result-icon"
                      onClick={() => handleSelectData(searchValue)}
                    />
                  </div>
                ) : null}
              </div>
              {selectedResults.length > 0 ? (
                <>
                  <div className="user-info-selected-data-container">
                    {selectedResults.map((eachResult) => (
                      <div
                        key={eachResult}
                        className="user-info-selected-data-each-container"
                      >
                        <Text content={eachResult} m="0" />
                        <IoIosCloseCircle
                          onClick={() => handleDeleteSelected(eachResult)}
                          style={{
                            fill: "red",
                            fontSize: "22px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="userdata-update-button">
                    <Button
                      handleClick={updateData}
                      content="Update"
                      backgroundColor="black"
                      color="#FFFFFF"
                      fontSize="22px"
                      border="none"
                      borderRadius="6px"
                      padding="0 0 0 6px"
                      height="30px"
                      icon="add"
                      iconPosition="end"
                    />
                  </div>
                </>
              ) : null}
            </>
          ) : userData[type.reduxStoreVar].length > 0 ? (
            <motion.div
              className="userdata-cards-container"
              variants={dataContainer}
              initial="hidden"
              animate="visible"
            >
              {userData[type.reduxStoreVar].map((eachItem) => (
                <motion.div key={eachItem.name} variants={dataItem}>
                  <UserDataCard type={type} item={eachItem} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <NoInfo />
          )}
          {!enableSearch ? (
            <div className="userdata-add-button">
              <Button
                handleClick={() => setEnableSearch(true)}
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
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default UserDataDialog;
