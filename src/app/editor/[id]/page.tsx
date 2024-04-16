import EditArea from "@/features/EditArea";
import SideBar from "@/features/SideBar";
import { createClient } from "@/utils/supabase/server";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React from "react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const getEditor = async (id: string) => {
//   const res = await fetch(`${API_URL}/api/editor/${id}/`, {
//     method: "GET",
//     cache: "no-store",
//   });
//   return res.json();
// };

const Editor = async ({ params }: { params: { id: string } }) => {
  // const res = await getEditor(params.id);
  const supabase = createClient();
  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("editorData")
        .select("*")
        .eq("id", params.id)
        .single();

      console.log("Succes", data);
      return data;
    } catch (error) {
      return console.log("Error", error);
    }
  };
  const data = await getData();

  const quillData = JSON.parse(data.quillContents);
  const iconsData = JSON.parse(data.iconsData);
  const titleData = data.title;
  const artistData = data.artist;

  console.log("quillData", quillData);

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
