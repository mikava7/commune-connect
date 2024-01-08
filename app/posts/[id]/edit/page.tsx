import React from "react";
import EditForm from "@/app/ui/posts/edit-post";
import { fetchPostById } from "@/app/lib/data";

type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  authorId: number;
};

export default async function Page({ params }: { params: any }) {
  const id = parseInt(params.id, 10);

  const post: any = await fetchPostById({ id });

  if (!post) {
    // Handle the case where post is null (optional)
    return <div>Post not found</div>;
  }

  return (
    <div>
      <EditForm post={post} />
    </div>
  );
}
