import React from "react";
import Image from "next/image";
import { Member } from "@/app/lib/definitions";
export default function MemberProfile({ member }: { member: Member }) {
  return (
    <div>
      <div>
        <Image
          src={`/${member?.imageLink}`}
          alt={`${member?.name} users profile photo`}
          width={80}
          height={80}
        />
      </div>
      <div>
        <h1>{member?.name}</h1>
        <h2>{member?.role}</h2>
        <p>{member?.email}</p>
        <p>{member?.address}</p>
      </div>
      <div>
        <div>
          <span>projects done</span>
          <span>50</span>
        </div>
        <div>
          <span>Inventory</span>
          <span>150</span>
        </div>
        <div>
          <span>events</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
