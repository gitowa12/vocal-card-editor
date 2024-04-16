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

const LoginForm = () => {
  const [currentUser, setcurrentUser] = useState("");
  const [currentUserEmail, setcurrentUserEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const supabase = createClient();
  console.log("currentUser", currentUser);
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

  // 現在ログインしているユーザーを取得する処理
  const getCurrentUser = async () => {
    // ログインのセッションを取得する処理
    const { data } = await supabase.auth.getSession();

    // セッションがあるときだけ現在ログインしているユーザーを取得する
    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数

      const {
        data: { user },
      } = await supabase.auth.getUser();
      // currentUserにユーザーのメールアドレスを格納
      console.log();
      setcurrentUser(user.id);
      setcurrentUserEmail(user?.email);
      setProfileUrl(user.user_metadata.avatar_url);
    }
  };

  const handleLogout = async () => {
    await Logout();
    router.push(`/`);
    router.refresh();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      {currentUser ? (
        <div ref={dropdownRef} className="relative -mb-[6px]">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src={profileUrl} className="rounded-full size-10 " />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 bg-neutral-50 text-neutral-950  rounded-lg w-[250px] shadow-md"
              suppressHydrationWarning={true}
            >
              <div className="dropdown-menu">
                <div className="rounded-t-lg p-3 hover:bg-neutral-300">{currentUserEmail} </div>
                <div className=" p-3 hover:bg-neutral-300">
                  <Link href="/list" className="">
                    <p>一覧</p>
                  </Link>
                </div>
                <div className="rounded-b-lg  hover:bg-neutral-300">
                  <button className="p-3" onClick={handleLogout}>
                    ログアウト
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoginButton></LoginButton>
      )}
    </div>
  );
};

export default LoginForm;
