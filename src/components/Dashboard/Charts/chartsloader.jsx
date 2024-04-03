import { Skeleton } from "@mui/material";
import React from "react";

const trendSkeletonProperties = [
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
  { width: "100%", height: 50 },
];

const ChartsLoader = () => {
  return (
    <div>
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

export default ChartsLoader;
