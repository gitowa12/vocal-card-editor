// "use client";

import CreateNewButton from "@/features/CreateNewButton";
import { supabase } from "@/util/supabaseClient";
import { formatDate } from "@/util/formatDate";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EditorData } from "@/types";
import { notFound } from "next/navigation";

const List = async ({ params }: { params: { id: string } }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/`, {
    method: "GET",
    cache: "no-store",
  });
  if (res.status !== 200) {
    notFound();
  }
  console.log(res);
  const result = await res.json();
  console.log("result", result);
  // const res = await fetch(`${API_URL}/api/`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${jwt}`,
  //   },
  //   cache: "no-store",
  // });
  // if (res.status !== 200) {
  //   notFound();
  // }
  // console.log(res);
  // const result = await res.json();
  // console.log("result", result);

  // const { data, error } = await supabase
  //   .from("editorData")
  //   .select("*")
  //   .order("updated_at", { ascending: false });

  // if (error) {
  //   console.error(error);
  //   return <div>Error loading data.</div>;
  // }

  // const result = data.map((item) => ({
  //   ...item,
  //   updated_at: formatDate(item.updated_at),
  // }));

  // const [result, setResult] = useState<EditorData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from("editorData")
  //       .select("*")
  //       .order("updated_at", { ascending: false });

  //     if (error) {
  //       console.error(error);
  //     } else if (data) {
  //       // データのフォーマットをここで行う
  //       setResult(
  //         data.map((item) => ({
  //           ...item,
  //           updated_at: formatDate(item.updated_at), // 日付のフォーマット
  //         }))
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="w-[1200px]  mx-auto py-7 ">
      <div>
        <CreateNewButton></CreateNewButton>
      </div>

      <div className="text-2xl">一覧</div>
      <div className="flex flex-wrap">
        {result.map((item) => (
          <Link key={item.id} href={`../editor/${item.id}`} className="inline-block ">
            <div className="flex flex-col justify-between w-[276px] h-[130px] bg-white m-3 p-4 border-2 border-neutral-400 shadow  transition hover:bg-white hover:shadow-xl">
              <div>
                <p className="text-3xl mb-1 font-medium">{item.title}</p>
                <p>{item.artist}</p>
              </div>

              <p className="text-xs">{item.updated_at}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
