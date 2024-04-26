"use client";
import Link from "next/link";
import React, { useState } from "react";
import LoginButton from "../auth/LoginButton";
import CreateNewButton from "@/features/CreateNewButton";
import UserIcon from "../auth/UserIcon";

type Props = {
  session: boolean;
  userName: string;
  profile: string;
};
const Nav: React.FC<Props> = ({ session, userName, profile }) => {
  const [isSession, setIsSeeeion] = useState<boolean>(session);
  const [currentUserName, setCurrentUserName] = useState<string>(userName);
  const [profileUrl, setProfileUrl] = useState<string>(profile);

  return (
    <div>
      <nav className="animate-fadein">
        {isSession === false ? (
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="p-1 hover:text-neutral-400 font-semibold">
                ホーム
              </Link>
            </li>
            <li>
              <LoginButton></LoginButton>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="p-1  hover:text-neutral-400  font-semibold">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/list" className="p-1 hover:text-neutral-400  font-semibold">
                一覧
              </Link>
            </li>
            <li>
              <CreateNewButton></CreateNewButton>
            </li>
            <li>
              <UserIcon currentUserName={currentUserName} profileUrl={profileUrl}></UserIcon>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Nav;
