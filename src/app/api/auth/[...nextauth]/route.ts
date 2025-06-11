import { db } from "app/db";
import { users } from "app/db/schema";
import { eq } from "drizzle-orm";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const usersFound = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));
        const user = usersFound[0];
        if (user) {
          if (credentials.password === user.password)
            return { id: String(user.id), email: user.email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect() {
      return "/todolist";
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
