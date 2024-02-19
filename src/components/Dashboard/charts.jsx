import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { statesEnum } from "../../utils/enums";
import PaymentMethodChart from "./Charts/payment_method";
import BankChart from "./Charts/banks";
import CategoriesChart from "./Charts/categorie";
import UserCarousel from "./new_user/carousel";

const skeletonProperties = [
  { width: 100, height: 250 },
  { width: 40, height: 250 },
  { width: 40, height: 250 },
];

const Charts = (props) => {
  const { state } = props;
  const chartsStats = useSelector((state) => state.dashboard.charts);

  switch (state) {
    case statesEnum.INITIAL:
      return null;
    case statesEnum.LOADING:
      return (
        <div
          className="dashboard-transactions-skeleton-container"
          style={{ height: "auto" }}
        >
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
        <div className="dashboard-charts-container">
          {chartsStats?.paymentMethodStats ? (
            <PaymentMethodChart
              paymentMethodStats={chartsStats?.paymentMethodStats}
            />
          ) : null}
          {chartsStats?.bankStats ? (
            <BankChart bankStats={chartsStats?.bankStats} />
          ) : null}
          {chartsStats?.categoryStats ? (
            <CategoriesChart categoryStats={chartsStats?.categoryStats} />
          ) : null}
        </div>
      );
    case statesEnum.ERROR:
      return <UserCarousel />;
    default:
      return null;
  }
};

export default Charts;
