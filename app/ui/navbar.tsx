import Link from "next/link";
import { signOut, auth } from "@/app/utils/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "Home" },
  { href: "/commune", label: "Commune" },
  { href: "/posts", label: "Posts" },
];

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-evenly items-center">
        <div className="flex space-x-4">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {session ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await signOut();
            }}
          >
            <button className="bg-blue-600 flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-900 hover:text-blue-600">
              <PowerIcon className="w-6" />
              <div>Sign Out</div>
              <div>{JSON.stringify(session)}</div>
            </button>
          </form>
        ) : (
          <Link href="/member/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
