import React from "react";
import { useSelector } from "react-redux";
import { formatAmountToRupee } from "../../../utils/transctions_data_format";
import { motion } from "framer-motion";
import Text from "../../elements/text";
import {
  HiOutlineClipboardDocumentList,
  HiMiniQueueList,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";
import { BiStats } from "react-icons/bi";

const AnalyticsStats = () => {
  const transactionsStats = useSelector(
    (state) => state.dashboard.transactions
  );
  const totalStats = transactionsStats?.totalStats?.[0];

  const statsContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
        type: "linear",
      },
    },
  };

  const statsItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

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

      <motion.div
        className="dashboard-stats-cards-container"
        variants={statsContainer}
        initial="hidden"
        animate="visible"
      >
        {totalStats.totalTransactions ? (
          <motion.div
            className="dashboard-stats-each-card-container stat-card-one"
            variants={statsItem}
          >
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
          </motion.div>
        ) : null}
        {totalStats.totalTarnsactionsAmount ? (
          <motion.div
            className="dashboard-stats-each-card-container stat-card-two"
            variants={statsItem}
          >
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
                content={`₹${formatAmountToRupee(
                  totalStats.totalTarnsactionsAmount
                )}`}
                color="#000000"
                m="0"
                weight="700"
                size="20px"
              />
            </div>
          </motion.div>
        ) : null}
        {totalStats.starredTransactions ? (
          <motion.div
            className="dashboard-stats-each-card-container stat-card-three"
            variants={statsItem}
          >
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
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  ) : null;
};

export default AnalyticsStats;
