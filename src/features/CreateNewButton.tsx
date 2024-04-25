"use client";

import { createClient } from "@/utils/supabase/client";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const addData = async () => {
//   const res = await fetch(`${API_URL}/api/editor`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   });
//   return res.json();
// };

const CreateNewButton = () => {
  const router = useRouter();

  const supabase = createClient();
  // const getJwt = async () => {
  //   // ログインのセッションを取得する処理
  //   const { data } = await supabase.auth.getSession();
  //   // セッションがあるときだけ現在ログインしているユーザーを取得する
  //   if (data.session !== null) {
  //     // supabaseに用意されている現在ログインしているユーザーを取得する関数
  //     // const {
  //     //   data: { user },
  //     // } = await supabase.auth.getUser();
  //     // console.log(user);
  //     console.log(data.session);
  //     const jwt = data.session;
  //     return jwt;
  //   }
  // };
  // const jwt = getJwt();

  const handleClick = async () => {
    try {
      const { data, error } = await supabase
        .from("editorData")
        .insert([{ quillContents: null, iconsData: null }])
        .select();

      console.log("成功したよ", data);
      if (!data) return;
      const id = data[0].id;
      router.push(`/editor/${id}`);
      router.refresh();
    } catch (error) {
      console.log("Error", error);
    }
  };
  // const handleClick = async () => {
  //   const res = await addData();
  //   console.log(res);
  //   const id = res.data[0].id;
  //   router.push(`/editor/${id}`);
  // };

  return (
    // <button
    //   className=" w-[276px] h-[130px] rounded-lg bg-white m-3 p-4 border shadow  transition hover:bg-white hover:shadow-xl inline-block"
    //   onClick={handleClick}
    // >
    //   <div className="flex justify-center items-center ">
    //     <img className="size-12 " src="/plus-circle.svg" alt="" />
    //   </div>
    // </button>
    <div>
      <button
        className=" font-semibold h-[36px] px-4 rounded-full  bg-sky-500 text-white  pb-[2px]  hover:bg-sky-600"
        onClick={handleClick}
      >
        新規作成
      </button>
    </div>
  );

  // );
};

export default CreateNewButton;
