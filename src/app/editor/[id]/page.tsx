import EditArea from "@/features/EditArea";
import SideBar from "@/features/SideBar";
import { supabase } from "@/util/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Editor = async ({ params }: { params: { id: string } }) => {
  // const fetchData = async () => {
  //   const { data, error } = await supabase
  //     .from("editorData")
  //     .select("*")
  //     .eq("id", params.id)
  //     .single();

  //   if (error) {
  //     console.error(error);
  //   }

  //   if (!data) {
  //     console.error("データが見つかりません");
  //   }
  //   const result = data;
  //   return result;
  // };
  // const result = await fetchData();
  // console.log("result", result);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/${params.id}/`, { method: "GET", cache: "no-store" });
  if (res.status !== 200) {
    notFound();
  }
  console.log(res);
  const result = await res.json();
  console.log("result", result);
  const quillData = JSON.parse(result.quillContents);
  const iconsData = JSON.parse(result.iconsData);
  const titleData = result.title;
  const artistData = result.artist;

  // console.log("quillData", quillData);

  return (
    <div className="">
      <div className="w-[1200px]  mx-auto py-7 ">
        <div className=" min-h-screen">
          <EditArea
            quillData={quillData}
            iconsData={iconsData}
            titleData={titleData}
            artistData={artistData}
            id={params.id}
          ></EditArea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
