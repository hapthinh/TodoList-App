import { SignInPage } from "@toolpad/core";
import { providerMap } from "auth";
import { signIn } from "next-auth/react";
import type { AuthProvider, AuthResponse } from "@toolpad/core";

export default function SignIn() {
  const handleSignIn = async (
    provider: AuthProvider,
    formData?: FormData,
    callbackUrl?: string
  ): Promise<AuthResponse> => {
    return signIn(provider.id, {
      email: formData?.get("email"),
      password: formData?.get("password"),
      callbackUrl,
      redirect: true,
    });
  };
  return <SignInPage providers={providerMap} signIn={handleSignIn} />;
}
