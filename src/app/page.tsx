"use client";

import React from "react";
import { useSession } from "next-auth/react";

import SignIn from "./auth/signin/page";
import TodoPage from "./todolist/page";

export default function App() {

  return (
    <>
      <TodoPage />
    </>
  );
}
