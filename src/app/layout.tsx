import React from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Metadata } from "next";

import { SuspenseWrapper } from "./utils/SuspenseWrapper";
import QueryClientWrapper from "./utils/QueryClientWrapper";
import Providers from "./provider/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Todo Dashboard',
  description: 'Next.js Todo FrontEnd App DashBoard, build with App Router.'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <QueryClientWrapper>
            <SuspenseWrapper>{children}</SuspenseWrapper>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
