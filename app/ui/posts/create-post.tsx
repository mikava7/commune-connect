"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createPost } from "@/app/lib/action";

export default function Form({ authorId }: { authorId: Number }) {
  // Initial state for the form
  const initialState = { message: null, errors: {} };
  // Use useFormState to manage form state and actions
  const [state, dispatch] = useFormState(createPost, initialState);

  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label
          htmlFor="fileUrl"
          className="block text-sm font-medium text-gray-700"
        >
          File URL
        </label>
        <input
          type="text"
          id="fileUrl"
          name="fileUrl"
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter file URL"
        />
      </div>
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
          className="mt-1 p-2 border rounded-md w-full"
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
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter content"
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="published"
          className="block text-sm font-medium text-gray-700"
        >
          Published
        </label>
        <input
          type="checkbox"
          id="published"
          name="published"
          className="mt-1 p-2 border rounded-md"
        />
      </div>
      {/* Display form errors, if any */}
      {state.errors && state.errors.message && (
        <p className="text-red-500">{state.errors.message}</p>
      )}
      {/* Display success message, if any */}
      {state.message && <p className="text-green-500">{state.message}</p>}
      {/* Submit button */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Submit
      </button>{" "}
    </form>
  );
}
