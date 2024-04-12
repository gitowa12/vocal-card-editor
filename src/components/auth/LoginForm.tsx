"use client";
import { supabase } from "@/util/supabaseClient";
import React, { useEffect, useRef, useState } from "react";
import Login from "./Login";
import LogOut from "./LogOut";
import Link from "next/link";
import Modal from "react-modal";
import { zIndex } from "html2canvas/dist/types/css/property-descriptors/z-index";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";

const LoginForm = () => {
  const [currentUser, setcurrentUser] = useState("");
  const [profileUrl, setProfileUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      setcurrentUser(user.id);
      setProfileUrl(user.user_metadata.avatar_url);
    }
  };

  useEffect(() => {
    getCurrentUser();
    console.log(currentUser);
  }, []);

  // モーダルを開く関数
  function openModal() {
    setModalIsOpen(true);
  }

  // モーダルを閉じる関数
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      {currentUser ? (
        <div ref={dropdownRef} className="relative -mb-[6px]">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src={profileUrl} className="rounded-full size-10 " />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 bg-neutral-50 text-neutral-950  rounded-lg w-[200px] shadow-md"
              suppressHydrationWarning={true}
            >
              <div className="dropdown-menu">
                <div className="rounded-t-lg p-3 hover:bg-neutral-300">{currentUser} </div>
                <div className=" p-3 hover:bg-neutral-300">
                  <Link href="/list" className="">
                    <p>一覧</p>
                  </Link>
                </div>
                <div className="rounded-b-lg p-3 hover:bg-neutral-300">
                  <LogOut></LogOut>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            className="py-1 px-3 text-sm bg-sky-500 border-neutral-500 rounded-full hover:bg-sky-600"
            onClick={openModal}
          >
            Log in
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal} // モーダル外のオーバーレイクリックやESCキーで閉じる処理
            contentLabel="Example Modal" // スクリーンリーダー用のラベル
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.30)",
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "0px",
                zIndex: 1000,
              },
            }}
          >
            <div className="relative">
              <button className="absolute top-3 right-3 z-50 w-fit h-fit " onClick={closeModal}>
                <img className="size-4" src="/x-mark.svg" alt="" />
              </button>
              <div className="w-[300px] flex flex-col  items-center relative p-4">
                <h2 className="mb-3">歌詞エディタ</h2>
                <div className="mb-3 text-xs text-center">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis
                </div>
                <Login></Login>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
