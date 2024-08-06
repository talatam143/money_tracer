import React from "react";
import { statesEnum } from "../../../utils/enums";
import AnalyticsLoader from "./analyticsloader";
import Navbar from "./navbar";
import AnalyticsStats from "./analytics_stats";
import UsageTrends from "./usage_trends";

import "./analytics_styles.css";
import Stats from "./stats";

const Analytics = (props) => {
  const { state, setMonthGroup } = props;

  switch (state) {
    case statesEnum.INITIAL:
    case statesEnum.LOADING:
      return <AnalyticsLoader />;
    case statesEnum.SUCCESS:
      return (
        <div className="dashboard-analytics-container">
          <Navbar setMonthGroup={setMonthGroup} />
          <AnalyticsStats />
          <UsageTrends />
          <Stats />
        </div>
      );
    default:
      return null;
  }
};

export default Analytics;
