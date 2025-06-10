import { db } from "app/db";
import { users } from "app/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    Credentials({
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
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) return { id: String(user.id), email: user.email };
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async redirect({}) {
      return "/todolist";
    },
  },
});

export { handler as GET, handler as POST };
