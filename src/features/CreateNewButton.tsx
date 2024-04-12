"use client";
import { supabase } from "@/util/supabaseClient";
import { notFound, useRouter } from "next/navigation";

import React, { useEffect } from "react";

const CreateNewButton = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const getJwt = async () => {
    // ログインのセッションを取得する処理
    const { data } = await supabase.auth.getSession();
    // セッションがあるときだけ現在ログインしているユーザーを取得する
    if (data.session !== null) {
      // supabaseに用意されている現在ログインしているユーザーを取得する関数
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();
      // console.log(user);
      console.log(data.session);
      const jwt = data.session;
      return jwt;
    }
  };
  const jwt = getJwt();

  const handleClick = async () => {
    try {
      const res = await fetch(`${API_URL}/api/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`, // JWTをヘッダーに設定
        },
        cache: "no-store",
      });

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
      <button
        className="py-2 px-3 bg-white rounded-lg border-2 border-neutral-400"
        onClick={handleClick}
      >
        新規作成
      </button>
    </div>
  );
};

export default CreateNewButton;
