import React, { useEffect, useState } from "react";
import Menu from "../home/menu";
import NewUserDashBoard from "./new_user/dashboard";
import { dashboardService } from "../../services/dashboard/dashboard";
import Analytics from "./Analytics/Analytics";
import Charts from "./charts";
import { useSelector } from "react-redux";
import { statesEnum } from "../../utils/enums";
import "./dashboard_styles.css";
import TransactionButton from "../elements/transaction_button";

const Dashboard = () => {
  const { isAnalyticsFetched, isChartsFetched, isChartsAvailable } =
    useSelector((state) => state.dashboard);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const [analyticsState, setAnalyticsState] = useState(statesEnum.INITIAL);
  const [chartsState, setChartsState] = useState(statesEnum.INITIAL);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (isAnalyticsFetched) {
        setAnalyticsState(statesEnum.SUCCESS);
        if (isChartsAvailable && isChartsFetched) {
          setChartsState(statesEnum.SUCCESS);
        } else if (isChartsAvailable && !isChartsFetched) {
          fetchChartsData();
        } else {
          setChartsState(statesEnum.ERROR);
        }
      } else {
        fetchAnalyticsData();
      }
    }
  }, [isAnalyticsFetched, isChartsAvailable, isChartsFetched, isUserLoggedIn]);

  async function fetchAnalyticsData() {
    setAnalyticsState(statesEnum.LOADING);
    let { status } = await dashboardService("get", "/transactions");
    if (status === 200) {
      setAnalyticsState(statesEnum.SUCCESS);
    } else {
      setAnalyticsState(statesEnum.ERROR);
      setChartsState(statesEnum.ERROR);
    }
  }

  async function fetchChartsData() {
    setChartsState(statesEnum.LOADING);
    let { status } = await dashboardService("get", "/charts");
    if (status === 200) {
      setChartsState(statesEnum.SUCCESS);
    } else {
      setChartsState(statesEnum.ERROR);
    }
  }

  return (
    <>
      {analyticsState === statesEnum.ERROR &&
      chartsState === statesEnum.ERROR ? (
        <NewUserDashBoard />
      ) : (
        <div className="dashboard-container">
          <Analytics state={analyticsState} />
          {/* <Charts state={chartsState} /> */}
        </div>
      )}
      <TransactionButton />
      <Menu />
    </>
  );
};

export default Dashboard;
