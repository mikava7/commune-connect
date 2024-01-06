import Link from "next/link";

export default function Sidenav() {
  return (
    <div>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">Home page</div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
        //       action={async () => {
        //         "use server";
        //         await signOut();
        //       }}
        >
          {" "}
          <div className="hidden md:block">Sign Out</div>
        </form>
      </div>
    </div>
  );
}
