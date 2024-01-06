import React from "react";
import { Member } from "@/app/lib/definitions";
import { fetchMembers } from "../../lib/data";
import MembersList from "@/app/ui/commune/members/membersList";
import { Suspense } from "react";

type Props = {};

export default async function page({}: Props) {
  const members: Member[] = await fetchMembers();

  return (
    <div>
      <Suspense fallback="Loading">
        <MembersList members={members} />
      </Suspense>
    </div>
  );
}
