import React, { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";

export const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<div><Skeleton /></div>}>{children}</Suspense>;
};
