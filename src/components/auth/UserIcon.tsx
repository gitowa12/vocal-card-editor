"use client";
// import { supabase } from "@/utils/supabaseClient";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { zIndex } from "html2canvas/dist/types/css/property-descriptors/z-index";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { createClient } from "@/utils/supabase/client";
import LoginButton from "./LoginButton";
import { Logout } from "./Logout";
import { useRouter } from "next/navigation";

//ユーザーデータ（名前やアイコンURLなど）は、クライアントコンポーネントで取得すると遅いため、
//サーバーコンポーネントの親コンポーネントで取得してそこから受け取る。
const UserIcon = ({ userData }) => {
  let user = userData;
  if (!user) {
    console.error("ユーザーデータが取得できませんでした。");
  }
  const currentUserName = user.user_metadata.name;
  const profileUrl = user.user_metadata.avatar_url;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // ドロップダウン以外の場所をクリックしたときにドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  Modal.setAppElement("body");

  const handleLogout = async () => {
    await Logout();
    location.reload();
    router.push(`/`);
    // router.refresh();
  };

  return (
    <div className="">
      <div ref={dropdownRef} className="relative -mb-[6px]">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src={profileUrl} className="rounded-full w-[40px] " />
        </button>
        {isDropdownOpen && (
          <div
            className="absolute z-[100] right-0 bg-white  text-neutral-950  rounded-lg w-[250px] shadow-md"
            suppressHydrationWarning={true}
          >
            <div className="dropdown-menu divide-y border rounded-lg">
              <div className="h-[48px] px-4 flex items-center">
                <p className="pb-[2px]">{currentUserName} でログイン中</p>
              </div>
              <div className="h-[48px] px-4 flex items-center hover:bg-neutral-300">
                <Link href="/list" className="">
                  <div className=" flex items-center">
                    <img src="/cards-line.svg" alt="" className="w-6 mr-2 " />
                    <p className="pb-[2px]">カード一覧</p>
                  </div>
                </Link>
              </div>
              <div className="h-[48px] px-4 flex items-center hover:bg-neutral-300">
                <button className="" onClick={handleLogout}>
                  <div className=" flex items-center">
                    <img src="/logout-line.svg" alt="" className="w-6 mr-2" />
                    <p className="pb-[2px]"> ログアウト</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserIcon;
