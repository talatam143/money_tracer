import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRupeeSign, FaRegCalendarAlt } from "react-icons/fa";
import Text from "../elements/text";
import { transactionCategories } from "../../utils/transactions_form_data";
import StarIcon from "../../assets/star_icon";
import IconAnimation from "../elements/icon_animation";
import { transactionService } from "../../services/transactions/transactions";

const TransactionItem = (props) => {
  const {
    transactionsLength,
    index,
    lastTransactionElementRef,
    transactionItem,
    updateDeleteTransactions,
  } = props;
  const [fontClass, setFontClass] = useState("");
  const transactionAnimation = useAnimation();
  const [openState, setOpenState] = useState(false);
  const [transactionDate, setTransactionDate] = useState("");

  useEffect(() => {
    let dateFormat = new Date(transactionItem.transaction_date)
      .getUTCDate()
      .toString()
      .padStart(2, "0");
    let monthFormat = (
      new Date(transactionItem.transaction_date).getUTCMonth() + 1
    )
      .toString()
      .padStart(2, "0");
    let yearFormat = new Date(transactionItem.transaction_date)
      .getUTCFullYear()
      .toString()
      .slice(-2);

    if (openState) {
      const timeSetings = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      };

      const timeFormat = new Intl.DateTimeFormat("en-US", timeSetings).format(
        new Date(transactionItem.transaction_date)
      );

      setTransactionDate(
        `${dateFormat}-${monthFormat}-${yearFormat} ${timeFormat}`
      );
    } else {
      setTransactionDate(`${dateFormat}-${monthFormat}-${yearFormat}`);
    }
  }, [openState, transactionItem.transaction_date]);

  const handleAnimateTransactionItem = () => {
    if (!openState) {
      setOpenState(!openState);
      setFontClass("transaction-font-handler");
    }
  };

  const handleDialogClose = () => {
    setOpenState(false);
    setTimeout(() => setFontClass(""), 400);
  };

  const deleteTransaction = async () => {
    const { status } = await transactionService(
      {},
      "delete",
      `/delete/${transactionItem._id}`
    );
    if (status === 200) {
      handleDialogClose();
      updateDeleteTransactions(transactionItem._id);
    }
  };

  return (
    <motion.div
      animate={transactionAnimation}
      ref={transactionsLength === index + 1 ? lastTransactionElementRef : null}
      className={
        openState
          ? "opened-transactions-list-item"
          : `transactions-list-item ${fontClass}`
      }
      onClick={handleAnimateTransactionItem}
      layout
    >
      {openState ? (
        <div className="open-transaction-container">
          <div className="open-transaction-header-container">
            <div className="open-transaction-header-controls-container">
              <IoMdArrowRoundBack
                className="open-transaction-back-icon"
                onClick={handleDialogClose}
              />
              <div className="open-transaction-header-controls-sub-container">
                <IconAnimation
                  type="Edit"
                  handleClickFunc={() => alert("Edit")}
                  theme
                />
                <IconAnimation
                  type="Delete"
                  handleClickFunc={deleteTransaction}
                  theme
                />
              </div>
            </div>
            <div className="open-transaction-title-container">
              {transactionItem.category
                ? transactionCategories[transactionItem.category.split("-")[0]][
                    transactionItem.category.split("-")[1]
                  ].largeIcon
                : null}
              <Text
                content={transactionItem.title}
                m="0"
                weight="600"
                size="25px"
                color="#ffffff"
              />
            </div>
          </div>
          <div className="open-transaction-body-container">
            <div className="open-transaction-category-container">
              <Text
                content={transactionItem.category}
                m="0 0 0 5px"
                weight="600"
                size="22px"
                color="#ffffff"
              />
              {transactionItem.starred ? (
                <StarIcon stroke="#ffe700" fill="#ffe700" />
              ) : null}
            </div>
            <div className="open-transaction-body-sub-container">
              <div className="open-transaction-amount-container">
                <FaRupeeSign className="open-transaction-body-sub-container-icon" />
                <Text
                  content={transactionItem.amount}
                  m="0"
                  weight="500"
                  size="17px"
                  color="#E0E0E0"
                />
              </div>
              <div className="open-transaction-date-container">
                <FaRegCalendarAlt className="open-transaction-body-sub-container-icon" />
                <Text
                  content={transactionDate}
                  m="0 0 0 5px"
                  weight="500"
                  size="17px"
                  color="#E0E0E0"
                />
              </div>
            </div>
          </div>

          {transactionItem.description ? (
            <div className="open-transaction-description-container">
              <Text
                content="Description:"
                m="0"
                weight="600"
                size="18px"
                color="#FFFFFF"
              />
              <Text
                content={transactionItem.description}
                m="5px 0 0 0"
                weight="500"
                size="16px"
                color="#E0E0E0"
              />
            </div>
          ) : null}

          {transactionItem.bank || transactionItem.payment_method ? (
            <>
              <hr style={{ width: "95%" }} />
              <div className="open-transaction-payments-container">
                {transactionItem.payment_method ? (
                  <div style={{ textAlign: "center" }}>
                    <Text
                      content="Payment Method"
                      m="0"
                      weight="600"
                      size="17px"
                      color="#FFFFFF"
                    />
                    <Text
                      content={transactionItem.payment_method}
                      m="5px 0 0 0"
                      weight="500"
                      size="15px"
                      color="#E0E0E0"
                    />
                  </div>
                ) : null}

                {transactionItem.bank && transactionItem.payment_method ? (
                  <hr className="open-transaction-payments-container-hr" />
                ) : null}
                {transactionItem.bank ? (
                  <div style={{ textAlign: "center" }}>
                    <Text
                      content="Bank"
                      m="0"
                      weight="600"
                      size="17px"
                      color="#FFFFFF"
                    />
                    <Text
                      content={transactionItem.bank}
                      m="5px 0 0 0"
                      weight="500"
                      size="15px"
                      color="#E0E0E0"
                    />
                  </div>
                ) : null}
              </div>
              <hr style={{ width: "95%" }} />
            </>
          ) : null}
          {transactionItem?.members?.length ? (
            <>
              <div className="open-transaction-users-container">
                <Text
                  content="Users:"
                  m="0"
                  weight="600"
                  size="18px"
                  color="#FFFFFF"
                />
                <div className="open-transaction-users-sub-container">
                  {transactionItem.members.map((eachMember) => (
                    <Text
                      content={eachMember}
                      m="0"
                      key={eachMember}
                      background="#121926"
                      p="6px 10px"
                      color="#E0E0E0"
                      borderRadius="6px"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}
          {transactionItem?.tags?.length ? (
            <div className="open-transaction-users-container">
              <Text
                content="Tags:"
                m="0"
                weight="600"
                size="18px"
                color="#FFFFFF"
              />
              <div className="open-transaction-users-sub-container">
                {transactionItem.tags.map((eachTag) => (
                  <Text
                    content={eachTag}
                    m="0"
                    key={eachTag}
                    background="#121926"
                    p="6px 10px"
                    color="#E0E0E0"
                    borderRadius="6px"
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="transactions-list-item-title-container">
            {transactionItem.category
              ? transactionCategories[transactionItem.category.split("-")[0]][
                  transactionItem.category.split("-")[1]
                ].mediumIcon
              : null}
            <Text content={transactionItem.title} m="0" weight="500" />
          </div>
          <div className="transactions-list-item-amount-container">
            <Text
              content={`₹ ${transactionItem.amount}`}
              m="0"
              p="2px 10px"
              weight="500"
              align="right"
              background="#202020"
              borderRadius="50px"
              color="#FFFFFF"
            />
            <Text content={transactionDate} m="0" />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TransactionItem;
