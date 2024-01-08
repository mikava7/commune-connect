"use client";
import { Post } from "../../lib/definitions";

export default function PostFeed({ posts }: { posts: Post }) {
  return (
    <div>
      {posts?.map((post) => (
        <div className=" m-3 p-3">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
