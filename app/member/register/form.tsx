"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { z, ZodError } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Form() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      // Validate the data using Zod
      schema.parse(data);

      // Reset error message on successful validation
      setErrorMessage(null);

      // Continue with sending the data to the backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error === "USER_ALREADY_EXISTS") {
        // Handle user already exists error
        setErrorMessage(responseData.message);
      } else if (responseData.error === "UNEXPECTED_ERROR") {
        // Handle unexpected error
        setErrorMessage("An unexpected error occurred. Please try again.");
      } else {
        console.log({ response });
        router.push("/member/login");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Set the error message from the first validation error
        setErrorMessage(error.errors[0]?.message || "Validation error");
      } else {
        // Set a default error message for unexpected errors
        setErrorMessage("An unexpected error occurred. Please try again.");
        console.error({ error });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
              className="text-gray-700 mt-1 p-2 border rounded-md w-full"
              placeholder="Enter your email"
            />
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
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
          >
            Sign Up
          </button>

          <Link href="/member/login">
            <button
              type="submit"
              className="text-white-500 text-black p-2 m-y-2 rounded-md w-full hover:bg-gray-600"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
