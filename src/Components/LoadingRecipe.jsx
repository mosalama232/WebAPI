import { Skeleton } from "@mui/material";
import React from "react";

const LoadingRecipe = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rectangular" width={300} height={200} />
      </div>
      <div className="d-flex justify-content-between">
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rectangular" width={300} height={200} />
      </div>
      <div className="d-flex justify-content-between">
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rectangular" width={300} height={200} />
        <Skeleton variant="rectangular" width={300} height={200} />
      </div>
    </>
  );
};

export default LoadingRecipe;
