'use client'

import { ThemeProvider } from "@mui/material/styles";
import theme from "app/theme";
import React from "react";

export function MuiThemeProvider({children} : {children:React.ReactNode}){
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}