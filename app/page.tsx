import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Home Page</h1>
      <div className="flex justify-center space-x-4">
        <Link href="/member/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link
          href="/member/register"
          className="text-green-500 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
