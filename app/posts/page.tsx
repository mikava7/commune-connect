import { getPosts } from "../lib/data";
import { Post } from "../lib/definitions";
import PostFeed from "../ui/posts/post-feed";
export default async function page() {
  const posts :Promise<Post> = await getPosts();

  return <div>
    
    <PostFeed posts={posts}/>
     </div>;
}
