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
    return list?.map?.((eachItem) => {
      let item = eachItem?.name ? eachItem?.name : eachItem;
      let key = parentKey ? `${parentKey}-${item}` : item;
      return (
        <div key={key} className="transaction-filter-checkbox-container">
          <input
            type="checkbox"
            value={key}
            id={item}
            name={name}
            onChange={handleCategoryChange}
            checked={storeArray.includes(key)}
          />
          <label htmlFor={item} className="transaction-filter-radio-label">
            {item}
          </label>
        </div>
      );
    });
  };

  switch (filterOption.displayText) {
    case transactionFilterHeaders[0].displayText:
      return Object.keys(categoriesList).map((eachCategory) => (
        <div key={eachCategory}>
          <Text
            content={eachCategory}
            m="10px 0 0 0"
            weight="500"
            size="16px"
          />
          {renderCheckboxes(
            "categories",
            categoriesList[eachCategory],
            selectedFilters.categories,
            eachCategory
          )}
        </div>
      ));
    case transactionFilterHeaders[1].displayText:
      return renderCheckboxes(
        "paymentMethods",
        transactionPaymentMethods,
        selectedFilters.paymentMethods
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
      return userData.userData[reduxStoreVar].length > 0 ? (
        renderCheckboxes(
          inputName,
          userData.userData[reduxStoreVar],
          storeArray
        )
      ) : (
        <Text content={`No ${name} details present`} m="0" align="center" />
      );
    default:
      return null;
  }
};

export default TransactionFilterLayer;
