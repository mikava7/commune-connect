"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createPost } from "@/app/lib/action";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPost, initialState);

  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 p-2 border rounded-md w-full text-gray-700"
          placeholder="Enter title"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="mt-1 p-2 border rounded-md w-full text-gray-700"
          placeholder="Enter content"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>{" "}
    </form>
  );
}
