import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Text from "../../elements/text";
import "./transaction_form_styles.css";
import IconAnimation from "../../elements/icon_animation";
import { userInfoService } from "../../../services/user/user_info";
import { formatUserData } from "../../../utils/format_user_data";
import { setUserData } from "../../../features/user_info/user_info";
import Button from "../../elements/button";
import { transactionService } from "../../../services/transactions/transactions";
import {
  resetTransactionsData,
  updateEditTransaction,
} from "../../../features/transactions/transactions";
import {
  draftTransactionForm,
  resetTransactionForm,
} from "../../../features/transactions/transaction_form";
import { Dialog, DialogActions } from "@mui/material";
import { setDialogType } from "../../../features/user_info/account_dialog";
import InputForm from "./input_form";

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

const TransactionForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setEditTransaction } = props;
  const userData = useSelector((state) => state.userData);
  const {
    isTransactionDrafted,
    isTransactionEdit,
    transactionObj,
    membersObj,
  } = useSelector((state) => state.transactionForm);
  const [transactionFormData, setTransactionFormData] =
    useState(initalFormState);
  const [membersTags, setMemebersTags] = useState(intialMembersTags);
  const [draftConfirmation, setDraftConfirmation] = useState(false);
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

  useEffect(() => {
    if (isTransactionDrafted || isTransactionEdit) {
      setTransactionFormData(transactionObj);
      setMemebersTags(membersObj);
      if (transactionObj.paymentMethod === "UPI") {
        setPaymentInfoVar("upiData");
      } else if (transactionObj.paymentMethod === "Credit Card") {
        setPaymentInfoVar("creditCardData");
      } else {
        setPaymentInfoVar("");
      }
    }
    if (isTransactionDrafted) {
      setDraftConfirmation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          const ioDate = new Date(transactionFormData[eachField]);
          const cuDate = new Date();
          if (
            ioDate.getFullYear() === cuDate.getFullYear() &&
            ioDate.getMonth() === cuDate.getMonth() &&
            ioDate.getDate() === cuDate.getDate()
          ) {
            ioDate.setHours(cuDate.getHours());
            ioDate.setMinutes(cuDate.getMinutes());
            ioDate.setSeconds(cuDate.getSeconds());
            const formattedDate = `${ioDate.getFullYear()}-${(
              ioDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${ioDate
              .getDate()
              .toString()
              .padStart(2, "0")} ${ioDate
              .getHours()
              .toString()
              .padStart(2, "0")}:${ioDate
              .getMinutes()
              .toString()
              .padStart(2, "0")}:${ioDate
              .getSeconds()
              .toString()
              .padStart(2, "0")}`;
            formData[eachField] = formattedDate;
          } else {
            formData[eachField] = transactionFormData[eachField];
          }
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

      let method = isTransactionEdit ? "put" : "post";
      let path = isTransactionEdit
        ? `/update/${localStorage.getItem("ur-ti")}`
        : "/add";
      const { status, data } = await transactionService(formData, method, path);
      if (status === 200) {
        if (isTransactionEdit) {
          dispatch(updateEditTransaction(data));
        } else {
          dispatch(resetTransactionsData());
        }
        handleTransactionDiscard(true);
      }
    }
  };

  const resetRadioButton = (name) => {
    console.log("called reset", name);
    setTransactionFormData((prevData) => ({
      ...prevData,
      [name]: "reset",
    }));
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
      value.length >= 3 ? setTitleError(false) : setTitleError(true);
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

  const handleTransactionDiscard = (state) => {
    if ((isTransactionDrafted || isTransactionEdit) && state) {
      dispatch(resetTransactionForm());
    }
    setTransactionFormData(initalFormState);
    setMemebersTags(intialMembersTags);
    setPaymentInfoVar("");
    setTitleError(false);
    if (isTransactionEdit) {
      setEditTransaction(false);
    } else {
      navigate("/transactions?monthly=true");
    }
  };

  const handleTransactionDraft = () => {
    dispatch(
      draftTransactionForm({
        transactionObj: transactionFormData,
        membersObj: membersTags,
      })
    );
    handleTransactionDiscard();
  };

  const handleDialogAction = (action) => {
    if (action === "Yes") {
      setDraftConfirmation(false);
    } else if (action === "No") {
      dispatch(resetTransactionForm());
      setDraftConfirmation(false);
      setTransactionFormData(initalFormState);
    }
  };

  const handleAccountNavigate = (data) => {
    dispatch(setDialogType(data));
    navigate("/account");
    dispatch(
      draftTransactionForm({
        transactionObj: transactionFormData,
        membersObj: membersTags,
      })
    );
    if (isTransactionDrafted || isTransactionEdit) {
      dispatch(resetTransactionForm());
    }
    setTransactionFormData(initalFormState);
    setMemebersTags(intialMembersTags);
    setPaymentInfoVar("");
    setTitleError(false);
    if (isTransactionEdit) {
      setEditTransaction(false);
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
          {!isTransactionEdit ? (
            <IconAnimation
              type="Draft"
              theme
              handleClickFunc={handleTransactionDraft}
            />
          ) : null}
          <IconAnimation
            type="Discard"
            theme
            handleClickFunc={() => handleTransactionDiscard(true)}
          />
        </div>
      </div>
      <InputForm
        handleTransactionSubmit={handleTransactionSubmit}
        transactionFormData={transactionFormData}
        titleError={titleError}
        handleFormChange={handleFormChange}
        paymentInfoVar={paymentInfoVar}
        handleAddArray={handleAddArray}
        membersTags={membersTags}
        handleDeleteArray={handleDeleteArray}
        isTransactionEdit={isTransactionEdit}
        handleAccountNavigate={handleAccountNavigate}
        resetRadioButton={resetRadioButton}
      />
      <Dialog open={draftConfirmation}>
        <Text
          content="Continue with drafted transaction .?"
          m="15px"
          size="22px"
          weight="600"
        />
        <DialogActions sx={{ margin: "10px" }}>
          {["Yes", "No"].map((eachAction) => (
            <Button
              key={eachAction}
              content={eachAction}
              border="none"
              backgroundColor="#202020"
              color="#FFFFFF"
              borderRadius="8px"
              width="70px"
              height="38px"
              fontSize="20px"
              fontWeight="500"
              handleClick={() => handleDialogAction(eachAction)}
            />
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
