"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { editPost } from "@/app/lib/action";
import { Post } from "@/app/lib/definitions";
import { Button } from "../button";
export default function EditForm({ post }: { post: any }) {
  const initialState = { message: null, errors: {} };
  const updatePostWithId = editPost.bind(null, post?.id);

  const [state, dispatch] = useFormState(updatePostWithId, initialState);

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
          defaultValue={post.title}
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
          defaultValue={post.content}
        ></textarea>
      </div>
      <Button type="submit">Edit Post</Button>
    </form>
  );
}
