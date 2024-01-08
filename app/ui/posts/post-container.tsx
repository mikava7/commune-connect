"use client";
import { Post } from "@/app/lib/definitions";
import { DeletePost, EditPost } from "./buttons";
type Props = {};

const PostContainer = ({ posts }: { posts: Post }) => {
  return (
    <div>
      {" "}
      {posts?.map((post) => (
        <div className=" m-3 p-3" key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div className="flex justify-center m-4 gap-3">
            <DeletePost id={post.id} />
            <EditPost id={post.id} />
          </div>

          <br />
        </div>
      ))}
    </div>
  );
};

export default PostContainer;
