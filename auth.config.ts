import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/member/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn in", isLoggedIn);
      // Allow access to all routes for non-logged-in users
      if (!isLoggedIn) {
        return true;
      }

      // For logged-in users, block access to /member/* routes
      if (nextUrl.pathname.startsWith("/member")) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [credentials],
} satisfies NextAuthConfig;
