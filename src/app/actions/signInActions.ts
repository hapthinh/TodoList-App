'use server'

import { AuthProvider } from "@toolpad/core";
import { signIn } from "next-auth/react";

export default async function signInAction(provider: AuthProvider, formData: FormData, callbackUrl : string) {
  try {
    return await signIn(provider.id, {
      ...(formData && {
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      callbackUrl : '/todolist'
    });
  } catch (e) {
    if (e instanceof Error && e.message === "NEXT_REDIRECT") {
      throw e;
    }
  }
}
