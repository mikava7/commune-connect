"use client";
import React from "react";
import Link from "next/link";
import { authenticate } from "@/app/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form action={dispatch} className="space-y-3">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" text-gray-700 mt-1 p-2 border rounded-md w-full"
              placeholder="Enter your email"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="text-gray-700 mt-1 p-2 border rounded-md w-full"
              placeholder="Enter your password"
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
          >
            Login
          </button>
          <Link href="/member/register">
            <button
              type="submit"
              className="text-white-500 text-black p-2 m-y-2 rounded-md w-full hover:bg-blue-600"
            >
              Sign Up
            </button>
          </Link>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
