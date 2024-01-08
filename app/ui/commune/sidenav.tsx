import Link from "next/link";
import { signOut } from "@/app/utils/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function Sidenav() {
  return (
    <div className="flex">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">Home page</div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className=" bg-blue-600 flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-900 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
