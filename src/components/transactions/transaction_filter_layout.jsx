import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesList,
  transactionFilterHeaders,
  transactionPaymentMethods,
} from "../../utils/transactions_form_data";
import Text from "../elements/text";
import { userInfoService } from "../../services/user/user_info";
import { formatUserData } from "../../utils/format_user_data";
import { setUserData } from "../../features/user_info/user_info";
import { userDataEnums } from "../../utils/enums";
import CustomDatePicker from "../elements/date_picker";

const TransactionFilterLayer = (props) => {
  const {
    filterOption,
    selectedFilters,
    handleCategoryChange,
    handleDateChange,
  } = props;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    async function fetchUserData() {
      if (!userData.isDataFetched) {
        const { status, data } = await userInfoService(
          {},
          "get",
          "/getuserdetails"
        );
        if (status === 200) {
          let formattedData = formatUserData(data);
          dispatch(setUserData(formattedData));
        }
      }
    }
    fetchUserData();
  }, [dispatch, userData.isDataFetched]);

  const renderCheckboxes = (name, list, storeArray, parentKey) => {
    console.log(list);
    return list?.map?.((eachItem) => {
      let item = eachItem?.name ? eachItem?.name : eachItem;
      let key = parentKey ? `${parentKey}-${item}` : item;
      return (
        <div key={key}>
          <Text
            handleClick={() => handleCategoryChange(name, key)}
            content={
              name === "creditCards"
                ? item.slice(0, item?.toUpperCase()?.indexOf?.("CREDIT CARD"))
                : item
            }
            m="0"
            p="2px 7px"
            border="solid 1px #364152"
            borderRadius="25px"
            background={storeArray.includes(key) ? "#202020" : "transparent"}
            color={storeArray.includes(key) ? "#ffffff" : "#364152"}
          />
        </div>
      );
    });
  };

  switch (filterOption.displayText) {
    case transactionFilterHeaders[0].displayText:
      return null;
    // Object.keys(categoriesList).map((eachCategory) => (
    //   <div key={eachCategory} style={{ marginBottom: "10px" }}>
    //     <Text content={eachCategory} m="0" weight="600" size="20px" />
    //     {renderCheckboxes(
    //       "categories",
    //       categoriesList[eachCategory],
    //       selectedFilters.categories,
    //       eachCategory
    //     )}
    //   </div>
    // ));
    case transactionFilterHeaders[1].displayText:
      return (
        <div className="transactions-filter-chip-container">
          {renderCheckboxes(
            "paymentMethods",
            transactionPaymentMethods,
            selectedFilters.paymentMethods
          )}
        </div>
      );
    case transactionFilterHeaders[2].displayText:
      return (
        <div>
          <CustomDatePicker
            propsValue={selectedFilters.date}
            label="Transaction Date"
            handleDateChange={handleDateChange}
            name="transactionDate"
          />
        </div>
      );
    case transactionFilterHeaders[3].displayText:
    case transactionFilterHeaders[4].displayText:
    case transactionFilterHeaders[5].displayText:
      const { reduxStoreVar, name } = userDataEnums.find(
        (item) => item.name === filterOption.displayText
      );
      var storeArray = "";
      var inputName = "";
      storeArray = selectedFilters[filterOption.name];
      inputName = filterOption.name;

      return (
        <div className="transactions-filter-chip-container">
          {userData.userData[reduxStoreVar].length > 0 ? (
            renderCheckboxes(
              inputName,
              userData.userData[reduxStoreVar],
              storeArray
            )
          ) : (
            <Text content={`No ${name} details present`} m="0" align="center" />
          )}
        </div>
      );
    default:
      return null;
  }
};

export default TransactionFilterLayer;
