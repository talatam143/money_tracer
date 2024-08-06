import React, { useEffect, useState } from "react";
import Menu from "../home/menu";
import NewUserDashBoard from "./new_user/dashboard";
import { dashboardService } from "../../services/dashboard/dashboard";
import Analytics from "./Analytics/Analytics";
import Charts from "./Charts/charts";
import { useDispatch, useSelector } from "react-redux";
import { statesEnum } from "../../utils/enums";
import "./dashboard_styles.css";
import TransactionButton from "../elements/transaction_button";
import { resetDashboardState } from "../../features/dashboard/dashboard";

const Dashboard = () => {
  const dispatch = useDispatch()
  const { isAnalyticsFetched, isChartsFetched, isChartsAvailable } =
    useSelector((state) => state.dashboard);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const [analyticsState, setAnalyticsState] = useState(statesEnum.INITIAL);
  const [chartsState, setChartsState] = useState(statesEnum.INITIAL);
  const [monthId, setMonthId] = useState("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnalyticsFetched, isChartsAvailable, isChartsFetched, isUserLoggedIn]);

  async function fetchAnalyticsData() {
    setAnalyticsState(statesEnum.LOADING);
    let path = "/transactions"
    if (monthId.length > 1) {
      path = `/transactions?month=${monthId}`
    }
    let { status } = await dashboardService("get", path);
    if (status === 200) {
      setAnalyticsState(statesEnum.SUCCESS);
    } else {
      setAnalyticsState(statesEnum.ERROR);
      setChartsState(statesEnum.ERROR);
    }
  }

  async function fetchChartsData() {
    setChartsState(statesEnum.LOADING);
    let path = "/charts"
    if (monthId.length > 1) {
      path = `/charts?month=${monthId}`
    }
    let { status } = await dashboardService("get", path);
    if (status === 200) {
      setChartsState(statesEnum.SUCCESS);
    } else {
      setChartsState(statesEnum.ERROR);
    }
  }

  function setMonthGroup(group) {
    setMonthId(group)
    dispatch(resetDashboardState())
    setAnalyticsState(statesEnum.INITIAL)
    setChartsState(statesEnum.INITIAL)
  }

  return (
    <>
      {analyticsState === statesEnum.ERROR &&
        chartsState === statesEnum.ERROR ? (
        <NewUserDashBoard />
      ) : (
        <div className="dashboard-container">
          <Analytics state={analyticsState} setMonthGroup={setMonthGroup} />
          <Charts state={chartsState} />
        </div>
      )}
      <TransactionButton />
      <Menu />
    </>
  );
};

export default Dashboard;
