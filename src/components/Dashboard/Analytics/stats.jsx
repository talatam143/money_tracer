import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Text from "../../elements/text";
import {
  formatAmountToRupee,
  formatDate,
} from "../../../utils/transctions_data_format";
import { SiGoogleanalytics } from "react-icons/si";
import { FaDotCircle } from "react-icons/fa";
import { transactionCategories } from "../../../utils/transactions_form_data";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { IoMdArrowRoundForward } from "react-icons/io";

const Stats = () => {
  const transactionsStats = useSelector(
    (state) => state.dashboard.transactions
  );

  const highestTransaction =
    transactionsStats?.highestTransaction?.[0]?.transaction;
  const lowestTransaction =
    transactionsStats?.lowestTransaction?.[0]?.transaction;
  const latestTransaction =
    transactionsStats?.latestTransaction?.[0]?.transaction;
  const oldTransaction = transactionsStats?.OldTransaction?.[0]?.transaction;

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

  return highestTransaction ||
    lowestTransaction ||
    latestTransaction ||
    oldTransaction ? (
    <div className="dashboard-transactions-stats-container">
      <div className="dashboard-stats-card-icon-container">
        <Text content="Stats" color="#000000" weight="600" size="22px" m="0" />
        <SiGoogleanalytics
          fontSize={20}
          color="#000000"
          style={{ strokeWidth: 0.1 }}
        />
      </div>
      <motion.div
        className="dashboard-transactions-stats-cards-container"
        variants={statsContainer}
        initial="hidden"
        animate="visible"
      >
        {highestTransaction ? (
          <motion.div
            variants={statsItem}
            className="dashboard-transactions-stats-each-card-container"
          >
            <div className="dashboard-transactions-stats-card-icon-container">
              <FaDotCircle
                style={{ marginTop: "5px" }}
                color="#ae9eeb"
                size={20}
              />
              <div>
                <Text
                  content="Highest Transaction"
                  color="#000000"
                  weight="600"
                  size="18px"
                  m="0"
                />
                <div className="dashboard-transactions-stats-card-title-container">
                  {highestTransaction.category ? (
                    transactionCategories[
                      highestTransaction.category?.split?.("-")?.[0]
                    ][highestTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  ) : (
                    <GiPerspectiveDiceSixFacesRandom />
                  )}
                  <Text
                    content={highestTransaction.title}
                    color="#959595"
                    m="0"
                    weight="500"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-transactions-stats-card-icon-container">
              <Text
                content={`₹${formatAmountToRupee(highestTransaction.amount)}`}
                m="0"
                color="#000000"
                weight="600"
                size="18px"
              />
              <IoMdArrowRoundForward
                size={25}
                style={{ alignSelf: "center" }}
              />
            </div>
          </motion.div>
        ) : null}
        {lowestTransaction ? (
          <motion.div
            variants={statsItem}
            className="dashboard-transactions-stats-each-card-container"
          >
            <div className="dashboard-transactions-stats-card-icon-container">
              <FaDotCircle
                style={{ marginTop: "5px" }}
                color="#cadc53"
                size={20}
              />
              <div>
                <Text
                  content="Lowest Transaction"
                  color="#000000"
                  weight="600"
                  size="18px"
                  m="0"
                />
                <div className="dashboard-transactions-stats-card-title-container">
                  {lowestTransaction.category ? (
                    transactionCategories[
                      lowestTransaction.category?.split?.("-")?.[0]
                    ][lowestTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  ) : (
                    <GiPerspectiveDiceSixFacesRandom />
                  )}
                  <Text
                    content={lowestTransaction.title}
                    color="#959595"
                    m="0"
                    weight="500"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-transactions-stats-card-icon-container">
              <Text
                content={`₹${formatAmountToRupee(lowestTransaction.amount)}`}
                m="0"
                color="#000000"
                weight="600"
                size="18px"
              />
              <IoMdArrowRoundForward
                size={25}
                style={{ alignSelf: "center" }}
              />
            </div>
          </motion.div>
        ) : null}
        {latestTransaction ? (
          <motion.div
            variants={statsItem}
            className="dashboard-transactions-stats-each-card-container"
          >
            <div className="dashboard-transactions-stats-card-icon-container">
              <FaDotCircle
                style={{ marginTop: "5px" }}
                color="#dd6745"
                size={20}
              />
              <div>
                <Text
                  content="Latest Transaction"
                  color="#000000"
                  weight="600"
                  size="18px"
                  m="0"
                />
                <div className="dashboard-transactions-stats-card-title-container">
                  {latestTransaction.category ? (
                    transactionCategories[
                      latestTransaction.category?.split?.("-")?.[0]
                    ][latestTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  ) : (
                    <GiPerspectiveDiceSixFacesRandom />
                  )}
                  <Text
                    content={latestTransaction.title}
                    color="#959595"
                    m="0"
                    weight="500"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-transactions-stats-card-icon-container">
              {latestTransaction.transaction_date ? (
                <Text
                  content={`${formatDate(latestTransaction.transaction_date)}`}
                  m="0"
                  color="#000000"
                  weight="600"
                  size="18px"
                />
              ) : null}
              <IoMdArrowRoundForward
                size={25}
                style={{ alignSelf: "center" }}
              />
            </div>
          </motion.div>
        ) : null}
        {oldTransaction ? (
          <motion.div
            variants={statsItem}
            className="dashboard-transactions-stats-each-card-container"
          >
            <div className="dashboard-transactions-stats-card-icon-container">
              <FaDotCircle
                style={{ marginTop: "5px" }}
                color="#888888"
                size={20}
              />
              <div>
                <Text
                  content="Oldest Transaction"
                  color="#000000"
                  weight="600"
                  size="18px"
                  m="0"
                />
                <div className="dashboard-transactions-stats-card-title-container">
                  {oldTransaction.category ? (
                    transactionCategories[
                      oldTransaction.category?.split?.("-")?.[0]
                    ][oldTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  ) : (
                    <GiPerspectiveDiceSixFacesRandom />
                  )}
                  <Text
                    content={oldTransaction.title}
                    color="#959595"
                    m="0"
                    weight="500"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-transactions-stats-card-icon-container">
              {oldTransaction.transaction_date ? (
                <Text
                  content={`${formatDate(oldTransaction.transaction_date)}`}
                  m="0"
                  color="#000000"
                  weight="600"
                  size="18px"
                />
              ) : null}
              <IoMdArrowRoundForward
                size={25}
                style={{ alignSelf: "center" }}
              />
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  ) : null;
};

export default Stats;
