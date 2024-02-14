import React from "react";
import { statesEnum } from "../../utils/enums";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import Text from "../elements/text";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCurrencyRupee,
  HiOutlineStar,
} from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import { bankRawData } from "../../utils/raw_data";
import {
  transactionCategories,
  transactionPaymentMethodIcons,
} from "../../utils/transactions_form_data";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import bankImage from "../../assets/bank.png";

const skeletonProperties = [
  { width: 60, height: 80 },
  { width: 40, height: 100 },
  { width: 40, height: 100 },
  { width: 40, height: 100 },
  { width: 100, height: 250 },
  { width: 40, height: 100 },
  { width: 40, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
];

const TextStyles = {
  highestHeading: { m: "0", color: "#FFFFFF", size: "20px", weight: "600" },
  highestPara: { m: "0" },
  preferredHeading: {
    m: "0",
    color: "#000000",
    size: "18px",
    weight: "600",
    align: "center",
  },
  preferredPara: {
    m: "0",
    size: "14px",
    color: "#202020",
    align: "center",
  },
};

const Analytics = (props) => {
  const { state } = props;
  const transactionsStats = useSelector(
    (state) => state.dashboard.transactions
  );
  const totalStats = transactionsStats?.totalStats?.[0];
  const preferredCategory = transactionsStats?.categoryStats?.[0];
  const preferredBank = transactionsStats?.bankStats?.[0];
  const preferredPaymentMethod = transactionsStats?.paymentMethodStats?.[0];
  const preferredDate = transactionsStats?.transactionDateStats?.[0];
  const highestTransaction =
    transactionsStats?.highestTransaction?.[0]?.transaction;
  const lowestTransaction =
    transactionsStats?.lowestTransaction?.[0]?.transaction;
  const latestTransaction =
    transactionsStats?.latestTransaction?.[0]?.transaction;
  const oldTransaction = transactionsStats?.OldTransaction?.[0]?.transaction;

  switch (state) {
    case statesEnum.LOADING:
      return (
        <div className="dashboard-transactions-skeleton-container">
          <Skeleton
            animation="wave"
            width={80}
            height={80}
            variant="circular"
            m="0"
          />
          {skeletonProperties.map((eachSkeleton, index) => (
            <Skeleton
              key={index}
              animation="wave"
              width={`${eachSkeleton.width}%`}
              height={eachSkeleton.height}
              variant="rounded"
              m="0"
            />
          ))}
        </div>
      );
    case statesEnum.SUCCESS:
      return (
        <div className="dashboard-transactions-container">
          {totalStats ? (
            <>
              {totalStats.totalTransactions ? (
                <div className="dashboard-total-transactions-container dashboard-sub-transactions-container">
                  <div>
                    <Text
                      content={totalStats.totalTransactions}
                      {...TextStyles.highestHeading}
                    />
                    <Text
                      content="Total Transactions"
                      {...TextStyles.highestPara}
                      color="#b39ddb"
                    />
                  </div>
                  <HiOutlineClipboardDocumentList className="dashboard-sub-transactions-icons" />
                </div>
              ) : null}

              {totalStats.totalTarnsactionsAmount ? (
                <div className="dashboard-sub-transactions-container dashboard-total-amount-container">
                  <div>
                    <Text
                      content={totalStats.totalTarnsactionsAmount}
                      {...TextStyles.highestHeading}
                    />
                    <Text
                      content="Total amount"
                      {...TextStyles.highestPara}
                      color="#90caf9"
                    />
                  </div>
                  <HiOutlineCurrencyRupee className="dashboard-sub-transactions-icons" />
                </div>
              ) : null}
              {totalStats.starredTransactions ? (
                <div className="dashboard-sub-transactions-container dashboard-toal-starred-container">
                  <div>
                    <Text
                      content={totalStats.starredTransactions}
                      {...TextStyles.highestHeading}
                      color="#000000"
                    />
                    <Text
                      content="Starred Transactions"
                      {...TextStyles.highestPara}
                      color="#202020"
                    />
                  </div>
                  <HiOutlineStar
                    className="dashboard-sub-transactions-icons"
                    color="#000000"
                  />
                </div>
              ) : null}
            </>
          ) : null}
          {preferredCategory ||
          preferredBank ||
          preferredPaymentMethod ||
          preferredDate ? (
            <>
              <Text
                content="Usage Trends"
                m="5px 0 0 0"
                color="#000000"
                weight="600"
                size="22px"
              />
              <div className="dashboard-preferred-transactions-container">
                {preferredBank ? (
                  <div className="dashboard-preferred-sub-container sub-preferred-bank">
                    <img
                      src={
                        bankRawData?.filter(
                          (eachData) => eachData.title === preferredBank.name
                        )?.[0]?.imageUrl || bankImage
                      }
                      alt="bank-icon"
                      className="sub-preferred-bank-image"
                    />
                    <div>
                      <Text
                        content={preferredBank.name}
                        {...TextStyles.preferredHeading}
                      />
                      <Text content="Bank" {...TextStyles.preferredPara} />
                      <Text
                        content={`${preferredBank.count} transactions`}
                        {...TextStyles.preferredPara}
                      />
                    </div>
                  </div>
                ) : null}
                {preferredCategory ? (
                  <div className="dashboard-preferred-sub-container">
                    <div className="dashboard-preferred-sub-icon">
                      {transactionCategories[
                        preferredCategory?.name?.split?.("-")?.[0]
                      ][preferredCategory?.name?.split?.("-")?.[1]]?.icon || (
                        <GiPerspectiveDiceSixFacesRandom />
                      )}
                    </div>

                    <div>
                      <Text
                        content={preferredCategory.name}
                        {...TextStyles.preferredHeading}
                      />
                      <Text content="Category" {...TextStyles.preferredPara} />
                      <Text
                        content={`${preferredCategory.count} transactions`}
                        {...TextStyles.preferredPara}
                      />
                    </div>
                  </div>
                ) : null}
                {preferredPaymentMethod ? (
                  <div className="dashboard-preferred-sub-container">
                    <div className="dashboard-preferred-sub-icon">
                      {
                        transactionPaymentMethodIcons[
                          preferredPaymentMethod.name
                        ].icon
                      }
                    </div>

                    <div>
                      <Text
                        content={preferredPaymentMethod.name}
                        {...TextStyles.preferredHeading}
                      />
                      <Text
                        content="Payment method"
                        {...TextStyles.preferredPara}
                      />
                      <Text
                        content={`${preferredPaymentMethod.count} transactions`}
                        {...TextStyles.preferredPara}
                      />
                    </div>
                  </div>
                ) : null}
                {preferredDate ? (
                  <div className="dashboard-preferred-sub-container sub-preferred-date">
                    <IoCalendarOutline />
                    <div>
                      <Text
                        content={preferredDate.date}
                        {...TextStyles.preferredHeading}
                      />
                      <Text content="Peak date" {...TextStyles.preferredPara} />
                      <Text
                        content={`${preferredDate.count} transactions recorded`}
                        {...TextStyles.preferredPara}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
          <div className="dashboard-records-transactions-container">
            {highestTransaction ? (
              <div className="dashboard-records-sub-container">
                {highestTransaction.transaction_date ? (
                  <div className="dashboard-records-sub-date-container">
                    <Text
                      content={new Date(
                        highestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { day: "numeric" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        highestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { month: "short" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        highestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { year: "numeric" })}
                      m="0"
                    />
                  </div>
                ) : null}
                <div className="dashboard-records-sub-text-container">
                  <Text content="Highest transaction" m="0" />
                  <Text content={`₹${highestTransaction.amount}`} m="0" />
                  <Text content={highestTransaction.title} m="0" />
                </div>
                {highestTransaction.category
                  ? transactionCategories[
                      highestTransaction.category?.split?.("-")?.[0]
                    ][highestTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  : null}
              </div>
            ) : null}
            {lowestTransaction ? (
              <div className="dashboard-records-sub-container">
                {lowestTransaction.transaction_date ? (
                  <div className="dashboard-records-sub-date-container">
                    <Text
                      content={new Date(
                        lowestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { day: "numeric" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        lowestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { month: "short" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        lowestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { year: "numeric" })}
                      m="0"
                    />
                  </div>
                ) : null}
                <div className="dashboard-records-sub-text-container">
                  <Text content="Lowest transaction" m="0" />
                  <Text content={`₹${lowestTransaction.amount}`} m="0" />
                  <Text content={lowestTransaction.title} m="0" />
                </div>
                {lowestTransaction.category
                  ? transactionCategories[
                      lowestTransaction.category?.split?.("-")?.[0]
                    ][lowestTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  : null}
              </div>
            ) : null}
            {latestTransaction ? (
              <div className="dashboard-records-sub-container">
                {latestTransaction.transaction_date ? (
                  <div className="dashboard-records-sub-date-container">
                    <Text
                      content={new Date(
                        latestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { day: "numeric" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        latestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { month: "short" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        latestTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { year: "numeric" })}
                      m="0"
                    />
                  </div>
                ) : null}
                <div className="dashboard-records-sub-text-container">
                  <Text content="Latest transaction" m="0" />
                  <Text content={`₹${latestTransaction.amount}`} m="0" />
                  <Text content={latestTransaction.title} m="0" />
                </div>
                {latestTransaction.category
                  ? transactionCategories[
                      latestTransaction.category?.split?.("-")?.[0]
                    ][latestTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  : null}
              </div>
            ) : null}
            {oldTransaction ? (
              <div className="dashboard-records-sub-container">
                {oldTransaction.transaction_date ? (
                  <div className="dashboard-records-sub-date-container">
                    <Text
                      content={new Date(
                        oldTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { day: "numeric" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        oldTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { month: "short" })}
                      m="0"
                    />
                    <Text
                      content={new Date(
                        oldTransaction.transaction_date
                      ).toLocaleDateString("en-GB", { year: "numeric" })}
                      m="0"
                    />
                  </div>
                ) : null}
                <div className="dashboard-records-sub-text-container">
                  <Text content="Oldest transaction" m="0" />
                  <Text content={`₹${oldTransaction.amount}`} m="0" />
                  <Text content={oldTransaction.title} m="0" />
                </div>
                {oldTransaction.category
                  ? transactionCategories[
                      oldTransaction.category?.split?.("-")?.[0]
                    ][oldTransaction.category?.split?.("-")?.[1]]?.icon || (
                      <GiPerspectiveDiceSixFacesRandom />
                    )
                  : null}
              </div>
            ) : null}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Analytics;
