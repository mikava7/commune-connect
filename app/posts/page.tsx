import { getPosts } from "../lib/data";
import { Post } from "../lib/definitions";
import PostFeed from "../ui/posts/post-feed";
import Link from "next/link";

export default async function page() {
  const posts: Promise<Post[]> = await getPosts();
  console.log("posts", posts);
  return (
    <div>
      <Link href={"/posts/create"} className="flex items-center justify-center">
        <h1>Create New Post</h1>
      </Link>

      <PostFeed posts={posts} />
    </div>
  );
}
