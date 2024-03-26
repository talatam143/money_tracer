import React from "react";
import { useSelector } from "react-redux";
import { userDataEnums } from "../../../utils/enums";
import InputField from "../../elements/input_field";
import MuiSelect from "../../elements/mui_select";
import {
  transactionCategories,
  transactionPaymentMethods,
} from "../../../utils/transactions_form_data";
import Text from "../../elements/text";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "../../elements/button";

const InputForm = (props) => {
  const {
    handleTransactionSubmit,
    transactionFormData,
    titleError,
    handleFormChange,
    paymentInfoVar,
    handleAddArray,
    membersTags,
    handleDeleteArray,
    isTransactionEdit,
    handleAccountNavigate,
  } = props;
  const userData = useSelector((state) => state.userData);

  return (
    <>
      <form onSubmit={handleTransactionSubmit} className="transaction-form">
        <InputField
          type="text"
          placeholder="Transaction title"
          label="Title *"
          name="title"
          value={transactionFormData.title}
          onChange={handleFormChange}
          containerWidth="48%"
          icon="title"
          required={true}
          error={titleError}
          errorText="Transaction title needs at least 3 letters."
        />
        <InputField
          type="number"
          placeholder="Transaction amount"
          label="Amount *"
          name="amount"
          value={transactionFormData.amount}
          onChange={handleFormChange}
          containerWidth="48%"
          icon="amount"
          required={true}
        />
        <div className="transaction-form-text-area-container">
          <label style={{ fontWeight: 600 }} htmlFor="description">
            Description
          </label>
          <textarea
            placeholder="Transaction description"
            name="description"
            id="description"
            spellCheck
            rows={4}
            className="transaction-form-text-area"
            style={{ resize: "vertical" }}
            onChange={handleFormChange}
            value={transactionFormData.description}
          ></textarea>
        </div>

        <div style={{ width: "48%", alignSelf: "flex-end" }}>
          <label style={{ fontWeight: 600 }} htmlFor="paymentMethod">
            Payment Method
          </label>

          <MuiSelect
            menuItems={transactionPaymentMethods}
            id="paymentMethod"
            name="paymentMethod"
            value={transactionFormData.paymentMethod}
            onChange={handleFormChange}
          />
        </div>
        <div style={{ width: "48%", alignSelf: "flex-end" }}>
          <label style={{ fontWeight: 600 }} htmlFor="bank">
            Select Bank
          </label>
          <MuiSelect
            menuItems={userData.userData.bankData}
            id="bank"
            name="bank"
            value={transactionFormData.bank}
            onChange={handleFormChange}
          />
        </div>
        <div style={{ width: "58%", alignSelf: "flex-end" }}>
          <label style={{ fontWeight: 600 }} htmlFor="paymentInfo">
            Payment Information
          </label>
          <MuiSelect
            menuItems={userData.userData[paymentInfoVar]}
            id="paymentInfo"
            name="paymentInfo"
            value={transactionFormData.paymentInfo}
            onChange={handleFormChange}
          />
        </div>
        <InputField
          type="date"
          name="transactionDate"
          placeholder="Transaction date"
          label="Transaction Date"
          icon="date"
          onChange={handleFormChange}
          required={true}
          value={transactionFormData.transactionDate}
          containerWidth="38%"
        />
        <div style={{ width: "80%", alignSelf: "flex-end" }}>
          <label style={{ fontWeight: 600 }} htmlFor="paymentInfo">
            Select Category
          </label>
          <MuiSelect
            menuItems={transactionCategories}
            id="category"
            name="category"
            value={transactionFormData.category}
            onChange={handleFormChange}
          />
        </div>
        <div style={{ width: "10%", alignSelf: "flex-end" }}>
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleFormChange}
              name="starred"
              checked={transactionFormData.starred}
            />
            <span className="slider"></span>
          </label>
        </div>
        <InputField
          type="text"
          placeholder="Add members"
          label="Members"
          name="members"
          value={transactionFormData.members}
          onChange={handleFormChange}
          containerWidth="48%"
          icon="user"
          addButton={true}
          handleAddButtonClick={() => handleAddArray("members")}
        />
        <InputField
          type="text"
          placeholder="Add tags"
          label="Tags"
          name="tags"
          value={transactionFormData.tags}
          onChange={handleFormChange}
          containerWidth="48%"
          icon="tags"
          addButton={true}
          handleAddButtonClick={() => handleAddArray("tags")}
        />
        {Object.keys(membersTags).map((eachArray) => (
          <div className="form-array-container" key={eachArray}>
            {membersTags[eachArray].map((eachItem) => (
              <div key={eachItem} className="form-each-array-container">
                <Text
                  content={eachItem}
                  m="0"
                  color="#ffffff"
                  size="18px"
                  weight="500"
                />
                <IoMdCloseCircle
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={() => handleDeleteArray(eachArray, eachItem)}
                />
              </div>
            ))}
          </div>
        ))}
        <div className="transaction-form-submit-btn-container">
          <Button
            type="submit"
            content={
              isTransactionEdit ? "Update Transaction" : "Save Transaction"
            }
            color="#FFFFFF"
            backgroundColor="#121926"
            border="none"
            borderRadius="8px"
            width="190px"
            height="42px"
            fontSize="20px"
            fontWeight="500"
            icon="none"
          />
        </div>
      </form>
      <ul style={{ marginTop: "30px" }}>
        <li className="transaction-form-list-items">
          Title & Amount are required to save your transaction
        </li>
        <li className="transaction-form-list-items">
          To ensure seamless transactions, add your Banks, UPI, or Credit Cards
          to your account before using them in the form.
        </li>
        <li className="transaction-form-list-items">
          Click on respective link below to add details
        </li>
        <ul>
          {userDataEnums.map((eachData) => (
            <li
              key={eachData.name}
              onClick={() => handleAccountNavigate(eachData)}
              className="transaction-form-navigate-list-items"
            >
              Add {eachData.name}
            </li>
          ))}
        </ul>
      </ul>
    </>
  );
};

export default InputForm;
