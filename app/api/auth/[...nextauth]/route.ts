import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Correct import
const prisma = new PrismaClient();
import { authConfig } from "../../../../auth.config";

const handler = NextAuth({
  //   ...authConfig,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials, req) {
        console.log(credentials);
      },
    }),
  ],
});
export { handler as GET, handler as POST };
