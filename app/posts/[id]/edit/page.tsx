import React from "react";
import EditForm from "@/app/ui/posts/edit-post";
import { fetchPostById } from "@/app/lib/data";
import { Post } from "@/app/lib/definitions";
export default async function Page() {
  const id = 10;
  const post: Post = await fetchPostById({ id });
  return (
    <div>
      "hello"
      <EditForm post={post} />
    </div>
  );
}
