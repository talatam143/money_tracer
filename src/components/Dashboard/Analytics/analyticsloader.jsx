import { Skeleton } from "@mui/material";
import React from "react";

const analyticsSkeletonProperties = [
  { width: 40, height: 110 },
  { width: 40, height: 110 },
  { width: 40, height: 110 },
  { width: 40, height: 110 },
];

const trendSkeletonProperties = [
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
];

const AnalyticsLoader = () => {
  return (
    <div className="analytics-skeleton-container">
      <div className="analytics-navbar-skeleton-container">
        <Skeleton
          animation="wave"
          width={50}
          height={50}
          variant="circular"
          m="0"
          sx={{ bgcolor: "grey.900" }}
        />
        <div>
          <Skeleton
            animation="wave"
            width={80}
            height={45}
            variant="rounded"
            m="0"
            sx={{ bgcolor: "grey.900" }}
          />
          <Skeleton
            animation="wave"
            width={55}
            height={55}
            variant="circular"
            m="0"
            sx={{ bgcolor: "grey.900" }}
          />
        </div>
      </div>
      <Skeleton
        animation="wave"
        variant="h1"
        width={200}
        m="0"
        sx={{ bgcolor: "grey.900", marginLeft: "10px" }}
      />
      <div className="analytics-carousel-skeleton-container">
        {analyticsSkeletonProperties.map((eachSkeleton, index) => (
          <Skeleton
            key={index}
            animation="wave"
            width={`${eachSkeleton.width}%`}
            height={eachSkeleton.height}
            variant="rounded"
            m="0"
            sx={{ bgcolor: "grey.900" }}
          />
        ))}
      </div>
      <div className="trends-carousel-skeleton-container">
        {trendSkeletonProperties.map((eachSkeleton, index) => (
          <Skeleton
            key={index}
            animation="wave"
            width={`${eachSkeleton.width}%`}
            height={eachSkeleton.height}
            variant="rounded"
            m="0"
            sx={{ bgcolor: "grey.900" }}
          />
        ))}
      </div>
      <div className="stats-skeleton-container">
        <Skeleton
          animation="wave"
          variant="h1"
          width={200}
          m="0"
          sx={{ marginLeft: "20px" }}
        />
        <div
          className="trends-carousel-skeleton-container"
          style={{ background: "#FFFFFF" }}
        >
          {trendSkeletonProperties.map((eachSkeleton, index) => (
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
      </div>
    </div>
  );
};

export default AnalyticsLoader;
