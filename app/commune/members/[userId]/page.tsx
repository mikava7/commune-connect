import { getUser } from "../../../lib/data";
import Image from "next/image";
import MemberProfile from "@/app/ui/commune/members/memberProfile";
import { Member } from "@/app/lib/definitions";
type Props = {
  params: {
    userId: string;
  };
};

export default async function Profile({ params: { userId } }: Props) {
  console.log("id", userId);

  const member: Member = await getUser(userId);
  console.log("member", member);
  return (
    <>
      <MemberProfile member={member} />
    </>
  );
}
