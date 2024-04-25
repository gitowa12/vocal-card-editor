import Link from "next/link";
import React from "react";

import LoginButton from "../auth/LoginButton";
import UserIcon from "../auth/UserIcon";
import { createClient } from "@/utils/supabase/server";
import CreateNewButton from "@/features/CreateNewButton";

const Header = async () => {
  const supabase = createClient();

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession(); // ログインのセッションを取得する処理
    if (error) {
      console.error("Errorだよ", error);
      return;
    }
    if (!data.session) {
      return false;
    }
    // console.log(data);
    return true;
  };

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(); // ログインのセッションを取得する処理
    if (error) {
      console.error("Errorだよ", error);
      return;
    }
    // console.log(user);
    return user;
  };

  const isSession = await getSession();
  let userData = null;
  if (isSession) {
    userData = await getUser();
    console.log("ユーザーデータ", userData);
  }
  let currentUserName = "";
  let profileUrl = "";
  if (userData) {
    currentUserName = userData.user_metadata.name;
    profileUrl = userData.user_metadata.avatar_url;
  }

  return (
    <header className="w-full  p-4 bg-white border-b ">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          <Link href="/" className="flex items-center">
            <img src="/Vird.svg" width="70" alt={""}></img>
          </Link>
        </h1>
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
    </header>
  );
};

export default Header;
