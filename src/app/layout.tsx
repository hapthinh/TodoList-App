import React from "react";

import Providers from "./provider/provider";
import "./globals.css";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SuspenseWrapper } from "./utils/SuspenseWrapper";
import QueryClientWrapper from "./utils/QueryClientWrapper";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
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
