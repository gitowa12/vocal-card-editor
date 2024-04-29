"use client";

import React from "react";

const AuthCodeErrorPage = () => {
  return (
    <div className="mx-auto max-w-[1280px] min-h-svh px-[16px] flex justify-center items-center">
      <div className=" w-[600px] h-[200px] bg-white border rounded-xl flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl mb-2">認証コードエラー</h1>
        <p>認証コードの処理中に問題が発生しました。</p>
        <p>もう一度試すか、サポートに連絡してください。</p>
        <button
          className="px-5 py-2 mt-5 text-lg text-white  bg-sky-400 rounded-full shadow cursor-pointer hover:bg-sky-500"
          onClick={() => (window.location.href = "/")}
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default AuthCodeErrorPage;
