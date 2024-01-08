import { getPosts } from "../lib/data";
import { Post } from "../lib/definitions";
import PostFeed from "../ui/posts/post-feed";
export default async function page() {
  const posts: Promise<Post> = await getPosts();
  console.log("posts", posts);
  return (
    <div>
      <PostFeed posts={posts} />
    </div>
  );
}
