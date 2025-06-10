"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSignIn = async () => {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    }).then((response) => 
      console.log(response)
    )
  };

  return (
    <div>
      <div>Sign in to your account</div>
      <div>
        <form onSubmit={handleSignIn}>
        <label>Nhap email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          type="submit"
        >dang nhap</button>
              </form>

      </div>
    </div>
  )
}
