"use client";

import { supabase } from "@/features/supabaseClient";
import Link from "next/link";
import React from "react";

export default async function List() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/`, { cache: "no-store" });

  console.log("ああああああああああああああ");
  const result = await res.json();
  console.log(result);
  // const data = await res.json(); // JSONとしてレスポンスデータを解析

  return (
    <div>
      <div className="text-xl">一覧</div>
      {result.map((item) => (
        <Link href={`../editor/${item.id}`}>
          <div className="m-2 p-1 border border-black inline-block transition hover:bg-white">
            <p className=" font-bold">ID</p>
            <p>{item.id}</p>
            <p className=" font-bold">CONTENTS</p>
            <p>{item.contents}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
