import React from "react";
import { useSelector } from "react-redux";
import { statesEnum, userDataEnums } from "../../../utils/enums";
import InputField from "../../elements/input_field";
import MuiSelect from "../../elements/mui_select";
import {
  transactionCategories,
  transactionPaymentMethods,
} from "../../../utils/transactions_form_data";
import Text from "../../elements/text";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "../../elements/button";
import RadioInput from "../../elements/radio_input";

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
    resetRadioButton,
  } = props;
  const userData = useSelector((state) => state.userData);
  const fetchState = useSelector((state) => state.fetchState);

  return (
    <div className="transaction-form-scroll-container">
      <form onSubmit={handleTransactionSubmit} className="transaction-form">
        <InputField
          type="text"
          placeholder="Transaction title"
          label="Title *"
          name="title"
          height="43px"
          value={transactionFormData.title}
          onChange={handleFormChange}
          icon="title"
          required={true}
          error={titleError}
          errorText="Transaction title needs at least 3 letters."
          autoFocus={true}
        />
        <div className="transaction-form-amount-date-container">
          <InputField
            type="number"
            placeholder="Transaction amount"
            label="Amount *"
            name="amount"
            height="43px"
            value={transactionFormData.amount}
            onChange={handleFormChange}
            icon="amount"
            required={true}
            containerWidth="50%"
          />
          <InputField
            type="date"
            name="transactionDate"
            placeholder="Transaction date"
            label="Transaction Date"
            icon="date"
            onChange={handleFormChange}
            required={true}
            value={transactionFormData.transactionDate}
            containerWidth="50%"
          />
        </div>
        <div>
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
        <div className="transaction-form-text-area-container">
          <label style={{ fontWeight: 600 }} htmlFor="description">
            Description
          </label>
          <textarea
            placeholder="Transaction description"
            name="description"
            id="description"
            spellCheck
            rows={3}
            className="transaction-form-text-area"
            style={{ resize: "vertical" }}
            onChange={handleFormChange}
            value={transactionFormData.description}
          ></textarea>
        </div>
        <div className="transaction-form-payment-parent-container">
          <RadioInput
            data={transactionPaymentMethods}
            checkedValue={transactionFormData.paymentMethod}
            handleChange={handleFormChange}
            name="paymentMethod"
            radioLabelHeading="Payment Method"
            resetRadioButton={resetRadioButton}
          />
          {userData.userData.bankData.length > 0 ? (
            <RadioInput
              data={userData.userData.bankData}
              checkedValue={transactionFormData.bank}
              handleChange={handleFormChange}
              name="bank"
              radioLabelHeading="Select Bank"
              resetRadioButton={resetRadioButton}
            />
          ) : (
            <>
              <Text
                content="No Bank details found."
                m="10px 0 3px 0"
                weight="600"
              />
              <Button
                content="Add Bank"
                handleClick={() => handleAccountNavigate(userDataEnums[0])}
                border="none"
                backgroundColor="#000000"
                color="#FFFFFF"
                padding="5px 7px"
                borderRadius="4px"
                margin="0 0 0 5px"
                fontSize="15px"
              />
            </>
          )}
          {transactionFormData.paymentMethod === "UPI" ||
            transactionFormData.paymentMethod === "Credit Card" ? (
            userData.userData[paymentInfoVar].length > 0 ? (
              <RadioInput
                data={userData.userData[paymentInfoVar]}
                checkedValue={transactionFormData.paymentInfo}
                handleChange={handleFormChange}
                name="paymentInfo"
                radioLabelHeading="Payment Information"
                resetRadioButton={resetRadioButton}
              />
            ) : (
              <>
                <Text
                  content={`No ${userDataEnums.filter(
                    (eachData) => eachData.reduxStoreVar === paymentInfoVar
                  )[0]?.name
                    } details found.`}
                  m="10px 0 3px 0"
                  weight="600"
                />
                <Button
                  content={`Add ${userDataEnums.filter(
                    (eachData) => eachData.reduxStoreVar === paymentInfoVar
                  )[0]?.name
                    }`}
                  handleClick={() =>
                    handleAccountNavigate(
                      ...userDataEnums.filter(
                        (eachData) => eachData.reduxStoreVar === paymentInfoVar
                      )
                    )
                  }
                  border="none"
                  backgroundColor="#000000"
                  color="#FFFFFF"
                  padding="5px 7px"
                  borderRadius="4px"
                  margin="0 0 0 5px"
                  fontSize="15px"
                />
              </>
            )
          ) : null}
        </div>
        <div className="transaction-form-favourite-contaier">
          <Text
            content="Mark as favourite"
            m="0 0 2px 0"
            p="0"
            weight="500"
            size="14px"
          />
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
        <div className="transaction-form-tags-users-contaier">
          <InputField
            type="text"
            placeholder="Add members"
            label="Members"
            name="members"
            value={transactionFormData.members}
            onChange={handleFormChange}
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
            icon="tags"
            addButton={true}
            handleAddButtonClick={() => handleAddArray("tags")}
          />
        </div>
        <div className="form-array-main-container">
          {Object.keys(membersTags).map((eachArray) => (
            <div className="form-array-container" key={eachArray}>
              {membersTags[eachArray].map((eachItem) => (
                <div key={eachItem} className="form-each-array-container">
                  <Text
                    content={eachItem}
                    m="0"
                    color="#ffffff"
                    size="16px"
                    weight="500"
                  />
                  <IoMdCloseCircle
                    style={{ fontSize: "23px", cursor: "pointer" }}
                    onClick={() => handleDeleteArray(eachArray, eachItem)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

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
            width="100%"
            height="55px"
            fontSize="22px"
            fontWeight="500"
            icon="none"
            disabled={fetchState.state === statesEnum.LOADING}
          />
        </div>
      </form>
    </div>
  );
};

export default InputForm;
