"use client";
import { Post } from "@/app/lib/definitions";
import { DeletePost } from "./buttons";
type Props = {};

const PostContainer = ({ posts }: { posts: Post }) => {
  return (
    <div>
      {" "}
      {posts?.map((post) => (
        <div className=" m-3 p-3" key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <DeletePost id={post.id} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default PostContainer;
