import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import Text from "../../elements/text";
import "./transaction_form_styles.css";
import IconAnimation from "../../elements/icon_animation";
import InputField from "../../elements/input_field";
import { userInfoService } from "../../../services/user/user_info";
import { formatUserData } from "../../../utils/format_user_data";
import { setUserData } from "../../../features/user_info/user_info";
import {
  transactionCategories,
  transactionPaymentMethods,
} from "../../../utils/transactions_form_data";
import MuiSelect from "../../elements/mui_select";
import Button from "../../elements/button";
import { transactionService } from "../../../services/transactions/transactions";
import { resetTransactionsData } from "../../../features/transactions/transactions";
import { useNavigate } from "react-router-dom";

const initalFormState = {
  title: "",
  description: "",
  amount: "",
  category: "reset",
  paymentMethod: "reset",
  paymentInfo: "reset",
  bank: "reset",
  transactionDate: `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
  starred: false,
  members: "",
  tags: "",
};

const intialMembersTags = { members: [], tags: [] };

const TransactionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [transactionFormData, setTransactionFormData] =
    useState(initalFormState);
  const [membersTags, setMemebersTags] = useState(intialMembersTags);
  const [paymentInfoVar, setPaymentInfoVar] = useState("");
  const [titleError, setTitleError] = useState(false);

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

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    if (!titleError) {
      let formData = {};
      Object.keys(transactionFormData).forEach((eachField) => {
        if (eachField === "members" || eachField === "tags") {
          if (membersTags[eachField].length > 0) {
            formData[eachField] = membersTags[eachField];
          }
        } else if (eachField === "transactionDate") {
          formData[eachField] = transactionFormData[eachField];
        } else if (eachField === "starred" && transactionFormData[eachField]) {
          formData[eachField] = transactionFormData[eachField];
        } else if (
          transactionFormData[eachField].length > 0 &&
          transactionFormData[eachField] !== "reset"
        ) {
          if (eachField === "amount") {
            formData[eachField] = Number(transactionFormData[eachField]);
          } else {
            formData[eachField] = transactionFormData[eachField];
          }
        }
      });
      const { status } = await transactionService(formData, "post", "/add");
      if (status === 200) {
        dispatch(resetTransactionsData());
        setTransactionFormData(initalFormState);
        setMemebersTags(intialMembersTags);
        navigate("/transactions");
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "paymentMethod") {
      if (value === "UPI") {
        setPaymentInfoVar("upiData");
      } else if (value === "Credit Card") {
        setPaymentInfoVar("creditCardData");
      } else {
        setPaymentInfoVar("");
      }
    }
    if (name === "title") {
      value.length > 3 ? setTitleError(false) : setTitleError(true);
    }
    if (name === "paymentMethod") {
      setTransactionFormData((prevData) => ({
        ...prevData,
        paymentInfo: "reset",
      }));
    }
    if (e.target.type === "checkbox") {
      setTransactionFormData((prevData) => ({
        ...prevData,
        [name]: e.target.checked,
      }));
    } else {
      setTransactionFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddArray = (type) => {
    if (
      transactionFormData[type].length !== 0 &&
      !membersTags[type].some(
        (tag) => tag.toLowerCase() === transactionFormData[type].toLowerCase()
      )
    ) {
      setMemebersTags((prevData) => ({
        ...prevData,
        [type]: [...prevData[type], transactionFormData[type]],
      }));
      setTransactionFormData((prevData) => ({ ...prevData, [type]: "" }));
    }
  };

  const handleDeleteArray = (type, item) => {
    setMemebersTags((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((eachItem) => eachItem !== item),
    }));
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
          <IconAnimation
            type="Discard"
            theme
            handleClickFunc={() => navigate("/")}
          />
        </div>
      </div>
      <form onSubmit={handleTransactionSubmit} className="transaction-form">
        <InputField
          type="text"
          placeholder="Transaction title"
          label="Title"
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
          label="Amount"
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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            type="submit"
            content="Save Transaction"
            color="#FFFFFF"
            backgroundColor="#121926"
            border="none"
            borderRadius="8px"
            width="190px"
            height="42px"
            fontSize="20px"
            fontWeight="500"
          />
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
