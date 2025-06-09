import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.password !== "password") return null;
        return { id: "1", email: credentials.email };
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
        return '/todolist'
    }
  },
});

export {handler as GET, handler as POST}

