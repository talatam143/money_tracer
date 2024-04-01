import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Text from "../../elements/text";
import { FaArrowTrendUp } from "react-icons/fa6";
import { bankIconData } from "../../../utils/raw_data";
import bankImage from "../../../assets/bank.png";
import {
  transactionCategories,
  transactionPaymentMethodIcons,
} from "../../../utils/transactions_form_data";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const UsageTrends = () => {
  const navigate = useNavigate();
  const transactionsStats = useSelector(
    (state) => state.dashboard.transactions
  );
  const preferredBank = transactionsStats?.bankStats?.[0];
  const preferredCategory = transactionsStats?.categoryStats?.[0];
  const preferredPaymentMethod = transactionsStats?.paymentMethodStats?.[0];
  const preferredDate = transactionsStats?.transactionDateStats?.[0];

  const handleTrendNavigate = (type) => {
    if (type === "preferredBank") {
      navigate(`/transactions?banks=${preferredBank.name}&monthly=false`);
    } else if (type === "preferredCategory") {
      navigate(
        `/transactions?categories=${preferredCategory.name}&monthly=false`
      );
    } else if (type === "preferredPaymentMethod") {
      navigate(
        `/transactions?paymentMethods=${preferredPaymentMethod.name}&monthly=false`
      );
    } else if (type === "preferredDate") {
      navigate(`/transactions?date=${preferredDate.date}&monthly=false`);
    }
  };

  return preferredBank ||
    preferredCategory ||
    preferredPaymentMethod ||
    preferredDate ? (
    <div className="dashboard-usage-trends-container">
      <div className="dashboard-stats-card-icon-container">
        <Text
          content="Usage Trends"
          color="#FFFFFF"
          weight="600"
          size="20px"
          m="0"
        />
        <FaArrowTrendUp fontSize={22} color="#FFFFFF" />
      </div>
      <div className="dashboard-usage-trends-cards-container">
        {preferredBank ? (
          <div
            className="dashboard-usage-trends-each-card-container"
            onClick={() => handleTrendNavigate("preferredBank")}
          >
            <div className="dashboard-usage-trends-each-card-sub-container">
              <img
                src={
                  bankIconData?.filter(
                    (eachData) => eachData.title === preferredBank.name
                  )?.[0]?.imageUrl || bankImage
                }
                alt="bank-icon"
                className="sub-preferred-bank-image"
              />
              <div>
                <Text
                  content={preferredBank.name}
                  m="0"
                  color="#fafafa"
                  size="16px"
                  weight="500"
                />
                <Text
                  content={`${preferredBank.count} transactions`}
                  m="0"
                  color="#888888"
                  weight="500"
                  size="14px"
                />
              </div>
            </div>
            <div className="dashboard-usage-trends-card-navigate-icon-container">
              <Text
                content="Bank"
                m="0"
                color="#888888"
                weight="500"
                size="14px"
              />
              <MdKeyboardArrowRight fontSize={32} color="#888888" />
            </div>
          </div>
        ) : null}
        {preferredCategory ? (
          <div
            className="dashboard-usage-trends-each-card-container"
            onClick={() => handleTrendNavigate("preferredCategory")}
          >
            <div className="dashboard-usage-trends-each-card-sub-container">
              <div className="dashboard-preferred-sub-icon preferred-icon-color-one">
                {transactionCategories[
                  preferredCategory?.name?.split?.("-")?.[0]
                ][preferredCategory?.name?.split?.("-")?.[1]]?.icon || (
                  <GiPerspectiveDiceSixFacesRandom />
                )}
              </div>
              <div>
                <Text
                  content={preferredCategory.name}
                  m="0"
                  color="#ae9eeb"
                  size="16px"
                  weight="500"
                />
                <Text
                  content={`${preferredCategory.count} transactions`}
                  m="0"
                  color="#888888"
                  weight="500"
                  size="14px"
                />
              </div>
            </div>
            <div className="dashboard-usage-trends-card-navigate-icon-container">
              <Text
                content="Category"
                m="0"
                color="#888888"
                weight="500"
                size="14px"
              />
              <MdKeyboardArrowRight fontSize={32} color="#888888" />
            </div>
          </div>
        ) : null}
        {preferredPaymentMethod ? (
          <div
            className="dashboard-usage-trends-each-card-container"
            onClick={() => handleTrendNavigate("preferredPaymentMethod")}
          >
            <div className="dashboard-usage-trends-each-card-sub-container">
              <div className="dashboard-preferred-sub-icon preferred-icon-color-two">
                {
                  transactionPaymentMethodIcons[preferredPaymentMethod.name]
                    .icon
                }
              </div>
              <div>
                <Text
                  content={preferredPaymentMethod.name}
                  m="0"
                  color="#cadc53"
                  size="16px"
                  weight="500"
                />
                <Text
                  content={`${preferredPaymentMethod.count} transactions`}
                  m="0"
                  color="#888888"
                  weight="500"
                  size="14px"
                />
              </div>
            </div>
            <div className="dashboard-usage-trends-card-navigate-icon-container">
              <Text
                content="Payment Method"
                m="0"
                color="#888888"
                weight="500"
                size="14px"
              />
              <MdKeyboardArrowRight fontSize={32} color="#888888" />
            </div>
          </div>
        ) : null}
        {preferredDate ? (
          <div
            className="dashboard-usage-trends-each-card-container"
            onClick={() => handleTrendNavigate("preferredDate")}
          >
            <div className="dashboard-usage-trends-each-card-sub-container">
              <div className="dashboard-preferred-sub-icon preferred-icon-color-three">
                <IoCalendarOutline />
              </div>
              <div>
                <Text
                  content={preferredDate.date}
                  m="0"
                  color="#dc6344"
                  size="16px"
                  weight="500"
                />
                <Text
                  content={`${preferredDate.count} transactions recorded`}
                  m="0"
                  color="#888888"
                  weight="500"
                  size="14px"
                />
              </div>
            </div>
            <div className="dashboard-usage-trends-card-navigate-icon-container">
              <Text
                content="Date"
                m="0"
                color="#888888"
                weight="500"
                size="14px"
              />
              <MdKeyboardArrowRight fontSize={32} color="#888888" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default UsageTrends;
