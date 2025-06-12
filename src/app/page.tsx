import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import TodoPage from "./todolist/page";

export default async function HomePage() {
  const authSession = await getServerSession();
  return (
    <main>
      {authSession?.user && <TodoPage />}
      {!authSession?.user && (
        <div className="flex justify-center text-3xl">
          <p>You are not logged in ===</p>
          <Link
            href="/auth/signin"
            className="text-blue-500 hover:text-blue-800"
          >
            {" "}
            Login
          </Link>
        </div>
      )}
    </main>
  );
}
