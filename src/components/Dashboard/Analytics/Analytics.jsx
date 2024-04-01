import React from "react";
import { statesEnum } from "../../../utils/enums";
import AnalyticsLoader from "./analyticsloader";
import Navbar from "./navbar";
import Stats from "./stats";
import UsageTrends from "./usage_trends";

import "./analytics_styles.css";

const Analytics = (props) => {
  const { state } = props;

  switch (state) {
    case statesEnum.INITIAL:
    case statesEnum.LOADING:
      return <AnalyticsLoader />;
    case statesEnum.SUCCESS:
      return (
        <div className="dashboard-analytics-container">
          <Navbar />
          <Stats />
          <UsageTrends />
        </div>
      );
    default:
      return null;
  }
};

export default Analytics;
