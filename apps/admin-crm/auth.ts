import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@live-style/database";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || user.role !== "ADMIN" || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);

        if (passwordsMatch) return user;
        
        return null;
      },
    }),
  ],
});
