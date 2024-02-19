import React from "react";
import { TbEdit, TbPlaylistAdd } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import Text from "../../elements/text";
import "./dashboard_styles.css";
import pieChart from "../../../assets/pie-chart.png";
import graphChart from "../../../assets/business-chart.png";
import timelineChart from "../../../assets/timeline.png";
import scatterChart from "../../../assets/scatter-graph.png";
import userCard from "../../../assets/id-card.png";
import bank from "../../../assets/museum.png";
import creditCard from "../../../assets/credit-card.png";
import qrPayment from "../../../assets/qr-code.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import UserCarousel from "./carousel";

const NewUserDashBoard = () => {
  return (
    <div className="new-user-dashboard-container">
      <UserCarousel />
      <div className="new-user-info-dashboard">
        <Text
          content="Futuristic Dashboard"
          m="0"
          weight="600"
          size="26px"
          color="#4527A0"
        />
        <Text
          content="Your financial saga unfolds on our dashboard, Conquer the heights of spending, and follow the rhythmic beats of monthly transaction graphs."
          m="0 5px"
          color="#202020"
        />
        <div className="new-user-dashboard-chart-images-container">
          <img
            src={pieChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
          <img
            src={graphChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
          <img
            src={timelineChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
          <img
            src={scatterChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
        </div>
      </div>
      <div className="new-user-info-transactions">
        <Text
          content="Seameless Transactions"
          m="0"
          weight="600"
          size="26px"
          color="#FFC107"
        />
        <Text
          content="Seamlessly handle transactions: Add, Update, Delete with ease. Sort, Filter, and Search in a snap!"
          m="0 5px"
          color="#202020"
        />
        <div className="new-user-info-transaction-timeline-container">
          <div>
            <TbPlaylistAdd className="new-user-info-transaction-timeline-icon" />
            <Text
              content="Create"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
          <div className="new-user-info-transaction-timeline-lines"></div>
          <div className="new-user-edit-timeline-icon">
            <TbEdit className="new-user-info-transaction-timeline-icon" />
            <Text
              content="Edit"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
          <div className="new-user-info-transaction-timeline-lines"></div>
          <div className="new-user-view-timeline-icon">
            <GrFormView className="new-user-info-transaction-timeline-icon" />
            <Text
              content="View"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
          <div className="new-user-info-transaction-timeline-lines"></div>
          <div className="new-user-sort-timeline-icon">
            <BiFilterAlt className="new-user-info-transaction-timeline-icon" />
            <Text
              content="Filter"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
        </div>
      </div>
      <div className="new-user-info-account">
        <Text
          content="Secured Account"
          m="0"
          weight="600"
          size="26px"
          color="#1565C0"
        />
        <Text
          content="Master your finances with our secure Accounts Hub – control your identity seamlessly, managing your payemnt information within a fortress of empowerment."
          m="0 5px"
          color="#202020"
        />
        <div className="new-user-dashboard-chart-images-container">
          <img
            src={userCard}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
          <img
            src={bank}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
          <img
            src={creditCard}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
          <img
            src={qrPayment}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
        </div>
      </div>
    </div>
  );
};

export default NewUserDashBoard;
