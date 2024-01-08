import React from "react";
import { Member } from "@/app/lib/definitions";
import { fetchMembers } from "../../lib/data";
import MembersList from "@/app/ui/commune/members/membersList";
import { Suspense } from "react";

type Props = {};

export default async function page({}: Props) {
  // throw new Error("error");
  const members: Member[] = await fetchMembers();
  console.log("member", members);

  return (
    <div>
      <Suspense fallback="Loading">
        <MembersList members={members} />
      </Suspense>
    </div>
  );
}
