"use client";
import { notFound, useRouter } from "next/navigation";

import React, { useEffect } from "react";

const CreateNewButton = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await fetch(`${API_URL}/api/`, { method: "POST", cache: "no-store" });
      if (res.status !== 201) {
        notFound();
      }
      const result = await res.json();
      console.log("result", result);
      // 成功した場合の処理（例えば、結果を表示またはユーザーをリダイレクトするなど）
      const newId = result[0].id;
      console.log(newId);
      router.push(`/editor/${newId}`);
    } catch (error) {
      console.error("リクエスト中にエラーが発生しました:", error);
      // エラー処理（ユーザーへの通知など）
    }
  };

  return (
    <div>
      <h2>新規作成</h2>
      <button className="py-2 px-3 bg-blue-500" onClick={handleClick}>
        新規作成
      </button>
    </div>
  );
};

export default CreateNewButton;
