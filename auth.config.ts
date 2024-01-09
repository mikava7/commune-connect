import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/member/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Allow access to all routes for non-logged-in users
      if (!isLoggedIn) {
        return true;
      }

      // For logged-in users, block access to /member/* routes
      if (nextUrl.pathname.startsWith("/posts")) {
        return Response.redirect(new URL("/commune", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
