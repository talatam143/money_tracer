import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../home/menu";
import NewUserDashBoard from "./new_user/dashboard";
import { dashboardService } from "../../services/dashboard/dashboard";
import Analytics from "./analytics";
import Charts from "./charts";
import { useSelector } from "react-redux";
import { statesEnum } from "../../utils/enums";
import "./dashboard_styles.css";
import BrandLogo from "../../assets/brand_logo";
import DashBoardUser from "../../assets/dashboard_user";
import Text from "../elements/text";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAnalyticsFetched, isChartsFetched } = useSelector(
    (state) => state.dashboard
  );
  const userInfo = useSelector((state) => state.auth);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const [analyticsState, setAnalyticsState] = useState(statesEnum.INITIAL);
  const [chartsState, setChartsState] = useState(statesEnum.INITIAL);
  const [isChartsAvailable, setIsChartsAvailable] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      isAnalyticsFetched
        ? setAnalyticsState(statesEnum.SUCCESS)
        : fetchAnalyticsData();

      isChartsAvailable && !isChartsFetched
        ? fetchChartsData()
        : isChartsFetched
        ? setChartsState(statesEnum.SUCCESS)
        : setChartsState(statesEnum.ERROR);
    }
  }, [isAnalyticsFetched, isChartsAvailable, isChartsFetched, isUserLoggedIn]);

  async function fetchAnalyticsData() {
    setAnalyticsState(statesEnum.LOADING);
    let { status, isChartsAvailable } = await dashboardService(
      "get",
      "/transactions"
    );
    if (status === 200) {
      setAnalyticsState(statesEnum.SUCCESS);
      setIsChartsAvailable(isChartsAvailable);
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
          {analyticsState === statesEnum.SUCCESS ? (
            <div className="dashboard-navbar-container">
              <BrandLogo width="50px" height="50px" />
              <div
                className="dashboard-navbar-user-container"
                onClick={() => navigate("/account")}
              >
                <Text
                  content={userInfo?.name?.split(" ")[0]}
                  color="#4527A0"
                  m="0"
                />
                <DashBoardUser />
              </div>
            </div>
          ) : null}
          <Analytics state={analyticsState} />
          <Charts state={chartsState} />
        </div>
      )}
      <Menu />
    </>
  );
};

export default Dashboard;
