import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "../lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function getUser(email: string) {
  console.log("email", email);
  try {
    const user = await prisma.member.findUnique({
      where: {
        email: email,
      },
    });
    return user ?? undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("credentials", credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log("password from database", user?.password);
          console.log("password", password);

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("passwordsMatch", passwordsMatch);

          if (passwordsMatch) {
            console.log("Login successful");
          } else {
            console.log("Passwords do not match");
            return null;
          }
        }
        console.log("Invalid credentials2");
        return { error: "Invalid credentials" };
      },
    }),
  ],
  session: { strategy: "jwt" },
});
