// "use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginButton from "../auth/LoginButton";
import UserIcon from "../auth/UserIcon";
import CreateNewButton from "@/features/CreateNewButton";
import { createClient } from "@/utils/supabase/server";
import Nav from "./nav";
// import { createClient } from "@/utils/supabase/client";

const Header = async () => {
  const supabase = createClient();
  // const [isSession, setIsSeeeion] = useState<boolean>(false);
  // const [currentUserName, setCurrentUserName] = useState<string>("");
  // const [profileUrl, setProfileUrl] = useState<string>("");

  // useEffect(() => {
  //   const getSession = async () => {
  //     const { data, error } = await supabase.auth.getSession(); // ログインのセッションを取得する処理
  //     if (error) {
  //       console.error("Errorだよ", error);
  //       return;
  //     }
  //     if (!data.session) {
  //       return false;
  //     }
  //     // console.log(data);
  //     return true;
  //   };

  //   const getUser = async () => {
  //     const session = await getSession();
  //     if (!session) return;
  //     setIsSeeeion(true);

  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser(); // ログインのセッションを取得する処理

  //     if (error) {
  //       console.error("Errorだよ", error);
  //       return;
  //     }
  //     if (user) {
  //       // console.log(user);
  //       setCurrentUserName(user.user_metadata.name);
  //       setProfileUrl(user.user_metadata.avatar_url);
  //     }
  //   };

  //   getUser();
  // }, []);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession(); // ログインのセッションを取得する処理
    if (error) {
      console.error("Error", error);
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
    // console.log("ユーザーデータ", userData);
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
          <Link href="/" className="flex items-end">
            <img src="/Vird.svg" width="70" alt={""} className="mr-1"></img>
            <p className="text-xs">(β)</p>
          </Link>
        </h1>
        <Nav session={isSession} userName={currentUserName} profile={profileUrl}></Nav>
      </div>
    </header>
  );
};

export default Header;
