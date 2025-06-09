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

export const { handlers, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (credentials?.password?.toString() !== "password") {
        return false;
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
});
