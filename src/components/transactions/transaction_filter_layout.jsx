import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  categoriesList,
  transactionFilterHeaders,
  transactionPaymentMethods,
} from "../../utils/transactions_form_data";
import Text from "../elements/text";

import { userDataEnums } from "../../utils/enums";
import CustomDatePicker from "../elements/date_picker";

const TransactionFilterLayer = (props) => {
  const {
    filterOption,
    selectedFilters,
    handleCategoryChange,
    handleDateChange,
    selectedCategoriesList,
  } = props;

  const userData = useSelector((state) => state.userData);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    return () => setSelectedCategory("");
  }, []);

  const renderCheckboxes = (name, list, storeArray, parentKey) => {
    return list?.map?.((eachItem) => {
      let item = eachItem?.name ? eachItem?.name : eachItem;
      let key = parentKey ? `${parentKey}-${item}` : item;
      return (
        <div
          key={key}
          className="transactions-filter-each-chip"
          style={{
            backgroundColor: storeArray.includes(key) ? "#364152" : null,
          }}
          onClick={() => handleCategoryChange(name, key)}
        >
          {eachItem?.imageUrl || eachItem.iconUrl ? (
            <img
              src={eachItem?.iconUrl || eachItem?.imageUrl}
              alt="icon"
              style={{ borderRadius: name === "UPI" ? "50px" : "0px" }}
              className="transactions-filter-chip-image"
            />
          ) : null}
          <Text
            content={
              name === "creditCards"
                ? item.slice(0, item?.toUpperCase()?.indexOf?.("CREDIT CARD"))
                : item
            }
            m="0"
            color={storeArray.includes(key) ? "#ffffff" : "#364152"}
          />
        </div>
      );
    });
  };

  switch (filterOption.displayText) {
    case transactionFilterHeaders[0].displayText:
      return (
        <>
          <div className="transactions-filter-chip-container">
            {Object.keys(categoriesList).map((eachCategory) => (
              <div
                className="transactions-filter-each-chip"
                key={eachCategory}
                onClick={() => {
                  setSelectedCategory((prevCategory) =>
                    prevCategory !== eachCategory ? eachCategory : ""
                  );
                }}
                style={{
                  backgroundColor: selectedCategoriesList.includes(eachCategory)
                    ? "#364152"
                    : null,
                }}
              >
                <Text
                  content={eachCategory}
                  m="0"
                  color={
                    selectedCategoriesList.includes(eachCategory)
                      ? "#ffffff"
                      : "#364152"
                  }
                />
              </div>
            ))}
          </div>
          {selectedCategory !== "" ? <hr /> : null}
          <div className="transactions-filter-chip-container">
            {renderCheckboxes(
              "categories",
              categoriesList[selectedCategory],
              selectedFilters.categories,
              selectedCategory
            )}
          </div>
        </>
      );
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
    case transactionFilterHeaders[5].displayText:
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
    case transactionFilterHeaders[2].displayText:
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
