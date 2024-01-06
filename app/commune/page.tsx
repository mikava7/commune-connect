import React from "react";
import Link from "next/link";
const Page = () => {
  return (
    <div className="container mx-auto my-8">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/commune/members"
            className="text-blue-500 hover:underline"
          >
            Our Members
          </Link>
        </li>
        <li>
          <Link
            href="/commune/library"
            className="text-blue-500 hover:underline"
          >
            Our Library
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
