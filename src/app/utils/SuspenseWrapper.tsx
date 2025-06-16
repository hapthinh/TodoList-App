import React, { Suspense } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<div><Stack><CircularProgress color="inherit" size={80}/></Stack></div>}>{children}</Suspense>;
};
