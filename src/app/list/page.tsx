// "use client";

import CreateNewButton from "@/features/CreateNewButton";

import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EditorData } from "@/types";
import { notFound } from "next/navigation";
import { AcroFormButton } from "jspdf";
import { supabase } from "@/utils/supabaseClient";
import { createClient } from "@/utils/supabase/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const getAll = async () => {
//   const res = await fetch(`${API_URL}/api/editor`, {
//     cache: "no-store",
//   });

//   if (res.status === 404) {
//     notFound();
//   }

//   // console.log(res);
//   const result = await res.json();
//   console.log(result.data);
//   return result.data;
//   // console.log("result", result);
// };

const List = async ({ params }: { params: { id: string } }) => {
  // const result = await getAll();
  const supabase = createClient();
  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("editorData")
        .select("*")
        .order("updated_at", { ascending: false });
      console.log("Success", data);
      return data;
    } catch (error) {
      return console.log("Error", error);
    }
  };
  const res = await getData();

  return (
    <div className="w-[1200px] min-h-svh mx-auto py-7 ">
      <CreateNewButton></CreateNewButton>
      <div className="text-2xl">一覧</div>
      <div className="flex flex-wrap">
        {res?.map((item) => (
          <Link key={item.id} href={`../editor/${item.id}`} className="inline-block">
            <div className="flex flex-col justify-between w-[276px] h-[130px] rounded-lg bg-white m-3 p-4 border shadow  transition hover:bg-white hover:shadow-xl">
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
  );
};

export default List;
