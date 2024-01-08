import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "../lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Correct import
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
    Credentials({
      async authorize(credentials) {
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
            return user;
          } else {
            console.log("Passwords do not match");
            return null;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
