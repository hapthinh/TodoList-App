'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <>
      <button
        className="border-red-50 bg-amber-600"
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "http://localhost:3001/" });
        }}
      >
        Sign Out
      </button>
    </>
  );
}
