import React from "react";

import TodoPage from "./todolist/page";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function HomePage() {
  const authSession = await getServerSession();
  return(
    <main>
      {authSession?.user && <TodoPage />}
      {!authSession?.user && (
        <Link href='/auth/signin'>Login</Link>
      )}
    </main>
  )
}
