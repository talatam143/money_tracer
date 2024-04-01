import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Text from "../../elements/text";
import {
  HiOutlineClipboardDocumentList,
  HiMiniQueueList,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";
import { BiStats } from "react-icons/bi";

const Stats = () => {
  const transactionsStats = useSelector(
    (state) => state.dashboard.transactions
  );
  const totalStats = transactionsStats?.totalStats?.[0];
  const [formattedTotalAmount, setFormattedTotalAmount] = useState("");

  useEffect(() => {
    let totalTarnsactionsAmount =
      Math.round(
        (Number(totalStats.totalTarnsactionsAmount) + Number.EPSILON) * 100
      ) / 100;

    let totalAmountString = Math.trunc(totalTarnsactionsAmount).toString();
    let formattedAmountString = "";
    let loopCount = 0;
    let isValidLoop;
    let initialLimits = { a: -3, b: totalAmountString.length };

    if (totalAmountString.length > 3) {
      isValidLoop = true;
    } else {
      formattedAmountString = totalAmountString;
    }

    while (isValidLoop) {
      loopCount += 1;
      if (
        totalAmountString.slice(initialLimits.a, initialLimits.b).length > 0
      ) {
        formattedAmountString =
          "," +
          totalAmountString.slice(initialLimits.a, initialLimits.b) +
          formattedAmountString;
        if (loopCount === 1) {
          initialLimits.a -= 2;
          initialLimits.b = -3;
        } else {
          initialLimits.a -= 2;
          initialLimits.b -= 2;
        }
      } else {
        isValidLoop = false;
        if (formattedAmountString[0] === ",") {
          formattedAmountString = formattedAmountString.slice(
            1,
            formattedAmountString.length
          );
        }
      }
    }
    formattedAmountString =
      formattedAmountString +
      "." +
      totalTarnsactionsAmount.toString().split(".")[1];
    setFormattedTotalAmount(formattedAmountString);
  }, [totalStats.totalTarnsactionsAmount]);

  return totalStats.totalTransactions ||
    totalStats.totalTarnsactionsAmount ||
    totalStats.starredTransactions ? (
    <div className="dashboard-stats-container">
      <div className="dashboard-stats-card-icon-container">
        <Text
          content="Expenses Analytics"
          color="#FFFFFF"
          weight="600"
          size="20px"
          m="0"
        />
        <BiStats fontSize={30} color="#FFFFFF" style={{ strokeWidth: 0.1 }} />
      </div>

      <div className="dashboard-stats-cards-container">
        {totalStats.totalTransactions ? (
          <div className="dashboard-stats-each-card-container stat-card-one">
            <div className="dashboard-stats-card-icon-container">
              <HiOutlineClipboardDocumentList className="dashboard-sub-transactions-icons" />
              <Text
                content="Transactions"
                color="#000000"
                m="0"
                weight="600"
                size="18px"
              />
            </div>
            <div>
              <Text content="Total" color="#000000" m="0" size="18px" />
              <div className="dashboard-stats-card-icon-container">
                <HiMiniQueueList fontSize={20} />
                <Text
                  content={totalStats.totalTransactions}
                  color="#000000"
                  m="0"
                  weight="700"
                  size="20px"
                />
              </div>
            </div>
          </div>
        ) : null}
        {totalStats.totalTarnsactionsAmount ? (
          <div className="dashboard-stats-each-card-container stat-card-two">
            <div className="dashboard-stats-card-icon-container">
              <HiOutlineCurrencyRupee className="dashboard-sub-transactions-icons" />
              <Text
                content="Amount"
                color="#000000"
                m="0"
                weight="600"
                size="18px"
              />
            </div>
            <div>
              <Text content="Total " color="#000000" m="0" size="18px" />
              <Text
                content={`₹${formattedTotalAmount}`}
                color="#000000"
                m="0"
                weight="700"
                size="20px"
              />
            </div>
          </div>
        ) : null}
        {totalStats.starredTransactions ? (
          <div className="dashboard-stats-each-card-container stat-card-three">
            <div className="dashboard-stats-card-icon-container">
              <HiOutlineClipboardDocumentList className="dashboard-sub-transactions-icons" />
              <Text
                content="Transactions"
                color="#000000"
                m="0"
                weight="600"
                size="18px"
              />
            </div>
            <div>
              <Text content="Starred" color="#000000" m="0" size="18px" />
              <div className="dashboard-stats-card-icon-container">
                <HiMiniQueueList fontSize={20} />
                <Text
                  content={totalStats.starredTransactions}
                  color="#000000"
                  m="0"
                  weight="700"
                  size="20px"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Stats;
