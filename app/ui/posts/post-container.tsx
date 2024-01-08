"use client";
import { Post } from "@/app/lib/definitions";
import { DeletePost, EditPost } from "./buttons";
import { useSession } from "next-auth/react";

type Props = {};

const PostContainer = ({ posts }: { posts: Post }) => {
  const { data: session, status } = useSession();
  console.log({ session, status });
  return (
    <div>
      {" "}
      {posts?.map(
        (post: {
          id: string;
          title: string;

          content: string;
        }) => (
          <div className=" m-3 p-3" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div className="flex justify-center m-4 gap-3">
              <DeletePost id={post.id} />
              <EditPost id={post.id} />
            </div>

            <br />
          </div>
        )
      )}
    </div>
  );
};

export default PostContainer;
