"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Suspense } from "react";
import Providers from "./provider/provider";
import TodoPage from "./components/TodoPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoPage />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Providers>
  );
}
