"use client";
import React from "react";
import { Member } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import {
  FlexColumnContainer,
  StyledGridContainer,
  FlexContainer,
} from "../../../../styles/styled-components";
export default function MembersList({ members }: { members: Member[] }) {
  console.log("MembersList in MembersList", members);
  return (
    <StyledContainer>
      <h1 className="mb-8 text-xl md:text-2xl">Members</h1>
      <StyledGridContainer>
        {members?.map((member) => (
          <UserCard
            key={member.id}
            //     className="w-50 h-60 mx-auto rounded-md bg-white p-12 relative"
          >
            <MoreIconContainer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </MoreIconContainer>

            <FlexContainer>
              <ImageContainer>
                <Image
                  src={`/${member.imageLink}`} // Provide a default image or handle missing image
                  // className="rounded-full"
                  alt={`${member.name}'s profile picture`}
                  width={80}
                  height={80}
                />
              </ImageContainer>

              <UserDetails>
                <Name>
                  <NameIcon
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </NameIcon>

                  {member.name || "Unknown"}
                </Name>
                <Address>
                  <AddressIcon
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </AddressIcon>

                  {member.address || "Unknown"}
                </Address>

                <StyledLink href={`/commune/members/${member.id}`}>
                  <StyledLinkContainer>
                    <EyeIcon
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />{" "}
                    </EyeIcon>
                    <StyledLinkText>View Details</StyledLinkText>
                  </StyledLinkContainer>
                </StyledLink>
              </UserDetails>
            </FlexContainer>
            <EmailContainer>
              <EmailIcon
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </EmailIcon>
              {member.email}
            </EmailContainer>
          </UserCard>
        ))}
      </StyledGridContainer>
    </StyledContainer>
  );
}
const StyledContainer = styled(FlexColumnContainer)``;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  border-radius: 0.4rem;
  width: 18rem;
  padding: 0.4rem 0.8rem;
  background-color: #d4d4fd;
`;
const MoreIconContainer = styled.div`
  position: absolute;
  top: 3;
  right: 0;
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100px;
  overflow: hidden;
  margin-right: 1rem;
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 8rem;
  width: 65%;
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: auto;
  :hover {
    transform: scale(1.02);
    background-color: #6d6de9;
  }
`;
const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #8181f5;
  margin: auto;
  outline: 1px solid grey;
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
`;

const StyledLinkText = styled.p`
  margin-right: 0.5rem;
`;

const EyeIcon = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
`;

const Name = styled.p`
  display: flex;
  font-weight: bold;
  color: black;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
`;
const NameIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  margin: auto;
  font-weight: bold;
  margin-right: 0.3rem;
`;
const Address = styled.span`
  display: flex;
  align-items: center;
  color: #070505;
  font-size: 1rem;
  margin-top: 0.4rem;

  margin-bottom: 0.4rem;
`;

const AddressIcon = styled.svg`
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.2rem;
`;

const EmailContainer = styled.span`
  display: flex;
  align-items: center;
  color: #3b3434;
`;

const EmailIcon = styled.svg`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.2rem;
`;
