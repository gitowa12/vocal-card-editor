"use client";

import React, { useState } from "react";
import { Login } from "./Login";

import Modal from "react-modal";

import { useRouter } from "next/navigation";

const LoginButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        className="py-1 px-3 text-sm text-white bg-sky-500 border-neutral-500 rounded-full hover:bg-sky-600"
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
            zIndex: 50,
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
            <img className="size-4" src="/x-mark.svg" alt="" />
          </button>
          <div className="w-[400px] flex flex-col  items-center p-4">
            <h2 className="mb-3">歌詞エディタ</h2>
            <div className="mb-3 text-xs text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis
            </div>
            <div>
              <button
                className="py-1 px-3 text-xs  bg-white border border-neutral-200 rounded-full hover:bg-sky-50"
                onClick={Login}
              >
                Login with Google
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
