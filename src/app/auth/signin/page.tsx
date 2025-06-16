"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/todolist",
    }).then((response) => console.log(response));
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div className="text-4xl font-semibold">Sign in to your account</div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <form onSubmit={handleSignIn}>
                <div className="relative">
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Email Address
                  </label>
                  <input
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="relative mt-4">
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Password
                  </label>
                  <input
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <button
                  className="bg-[#FFE794] text-black rounded-md px-2 py-1 mt-2 hover:bg-[#968857]"
                  type="submit"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
