import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers/index";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email Address", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize(c) {
      if (c.password !== "password") {
        return null;
      }
    },
  }),
];

export const providerMap = providers.map((provider) => {
  return { id: provider.id, name: provider.name };
});

