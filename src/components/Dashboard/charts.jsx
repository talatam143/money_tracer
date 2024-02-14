import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { statesEnum } from "../../utils/enums";
import Text from "../elements/text";

const skeletonProperties = [
  { width: 100, height: 250 },
  { width: 40, height: 250 },
  { width: 40, height: 250 },
];

const Charts = (props) => {
  const { state } = props;
  const chartsStats = useSelector((state) => state.dashboard.charts);

  console.log(chartsStats);
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
            <div className="dashboard-chart-pie-container">
              <Text content="Payment methods" m="0" />
            </div>
          ) : null}
        </div>
      );

    default:
      return null;
  }
};

export default Charts;
