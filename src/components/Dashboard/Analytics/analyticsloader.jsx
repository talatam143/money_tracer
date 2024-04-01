import { Skeleton } from "@mui/material";
import React from "react";

const skeletonProperties = [
  { width: 35, height: 100 },
  { width: 35, height: 100 },
  { width: 35, height: 100 },
  { width: 35, height: 100 },
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
        {skeletonProperties.map((eachSkeleton, index) => (
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
    </div>
  );
};

export default AnalyticsLoader;
