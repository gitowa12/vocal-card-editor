import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EditorData } from "@/types";
import { notFound, redirect } from "next/navigation";
import { AcroFormButton } from "jspdf";
import { supabase } from "@/utils/supabaseClient";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

// const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const getAll = async () => {
//   const res = await fetch(`${API_URL}/api/editor`, {
//     cache: "no-store",
//     headers: headers(),
//   });

//   if (res.status === 404) {
//     notFound();
//   }

//   // console.log(res);
//   const result = await res.json();
//   // console.log(result.data);
//   return result.data;
//   // console.log("result", result);
// };

const List = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession(); // ログインのセッションを取得する処理
    if (error) {
      console.error("Error", error);
      return;
    }
    if (!data.session) {
      return false;
    }
    console.log(data);
    return true;
  };

  const isSession = await getSession();

  if (!isSession) {
    console.log("ログインしてください");
    // redirect(`/`);
  }

  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("editorData")
        .select("*")
        .order("updated_at", { ascending: false });
      // console.log("Success", data);
      return data;
    } catch (error) {
      return console.log("Error", error);
    }
  };
  const res = await getData();
  const formattedData = res?.map((item) => ({
    ...item,
    updated_at: item.updated_at ? formatDate(item.updated_at) : formatDate(item.created_at),
  }));
  // const res = await getAll();

  return (
    <div className="max-w-[1280px] min-h-svh mx-auto flex flex-col items-center py-10 px-4">
      <h1 className="font-bold text-2xl mb-8 border-[#333]">カード一覧</h1>
      {/* <div className="mb-8">
        <CreateNewButton></CreateNewButton>
      </div> */}
      <div className="flex justify-center">
        <div className="grid gap-3 grid-cols-3 lg:grid-cols-4">
          {formattedData?.map((item) => (
            <Link key={item.id} href={`../editor/${item.id}`} className="inline-block">
              <div className="flex flex-col justify-between w-[240px] h-[130px]  rounded-lg bg-white  p-4 border shadow transition hover:bg-white hover:shadow-xl">
                <div>
                  <p className="text-3xl mb-1 font-medium">{item.title}</p>
                  <p>{item.artist}</p>
                </div>

                <p className="text-xs">{item.updated_at ? item.updated_at : item.created_at}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
