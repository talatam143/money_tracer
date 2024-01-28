import React, { useState } from "react";
import dayjs from "dayjs";
import Text from "../../elements/text";
import "./transaction_form_styles.css";
import IconAnimation from "../../elements/icon_animation";
import { IoClose } from "react-icons/io5";
import InputField from "../../elements/input_field";

const initalFormState = {
  title: "",
  description: "",
  amount: "",
  category: "",
  paymentMethod: "",
  paymentInfo: "",
  bank: "",
  transactionDate: dayjs(Date.now()),
  starred: false,
  members: "",
  tags: "",
};

const intialMembersTags = { members: [], tags: [] };

const TransactionForm = () => {
  const [transactionFormData, setTransactionFormData] =
    useState(initalFormState);
  const [membersTags, setMemebersTags] = useState(intialMembersTags);

  const handleFormSubmit = () => {};

  const handleFormChange = (e) => {
    if (e.target.type === "checkbox") {
      setTransactionFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setTransactionFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <div className="transaction-form-container">
      <div className="transaction-form-header-continer">
        <Text
          content="New Transaction"
          m="0"
          weight="600"
          size="20px"
          color="#E0E0E0"
        />
        <div className="transaction-form-header-icon-container">
          <IconAnimation type="Draft" theme />
          <IoClose className="open-transaction-back-icon" />
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="transaction-form">
        <InputField
          type="text"
          placeholder="Transaction title"
          label="Title"
          name="title"
          value={transactionFormData.title}
          onChange={handleFormChange}
          containerWidth="48%"
          icon="title"
        />
        <InputField
          type="number"
          placeholder="Transaction amount"
          label="Amount"
          name="amount"
          value={transactionFormData.amount}
          onChange={handleFormChange}
          containerWidth="48%"
          icon="amount"
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
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
