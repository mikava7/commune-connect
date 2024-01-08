import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
import { deletePost } from "@/app/lib/action";

export function DeletePost({ id }: { id: string }) {
  console.log("id in DeletePosts", id);
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <form action={deletePostWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
