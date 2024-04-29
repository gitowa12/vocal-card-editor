"use client";

import React, { useState } from "react";

import Modal from "react-modal";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";

const LoginButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const supabase = createClient();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(BASE_URL);

  const router = useRouter();

  const Login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          // redirectTo: window.location.origin,
          // redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
          //この処理がないと、ログイン完了後、セッションをクッキーに保存できない？？
          redirectTo: `${BASE_URL}/auth/callback`,
        },
      });
      console.log("User logged in", data);
    } catch (error) {
      console.error("Login error", error);
    }
  };

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
      <button
        className="h-[36px] px-5 text-md font-bold text-white bg-sky-500 border-neutral-500 rounded-full hover:bg-sky-600"
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
            zIndex: 500,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
          },
        }}
      >
        <div className="">
          <button className="absolute top-3 right-3 w-fit h-fit " onClick={closeModal}>
            <img className="w-6" src="/x-mark.svg" alt="" />
          </button>
          <div className="w-[400px]  flex flex-col  items-center p-8">
            <img src="/Vird.svg" width={80} alt="" className="mb-4" />
            <div className="mb-6 text-center">Googleアカウントでログインできます。</div>

            <div>
              <button
                className="py-2 px-4  bg-white border  rounded-full hover:bg-sky-50 flex items-center"
                onClick={Login}
              >
                <img src="/Google.svg" width={16} alt="" className="mr-2" />
                <p>Login with Google</p>
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginButton;
