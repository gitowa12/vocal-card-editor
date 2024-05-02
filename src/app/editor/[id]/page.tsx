import EditArea from "@/features/EditArea";
import { createClient } from "@/utils/supabase/server";
// import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
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

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession(); // ログインのセッションを取得する処理
    if (error) {
      console.error("Error", error);
      return;
    }
    if (!data.session) {
      return false;
    }
    // console.log(data);
    return true;
  };

  const isSession = await getSession();

  if (!isSession) {
    // console.log("ログインしてこい");
    redirect(`/`);
  }

  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from("editorData")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!data) {
        // notFound();
        throw new Error("エラーが発生しました。");
      }
      console.log("Success", data);
      return data;
    } catch (error) {
      return console.error("Error", error);
    }
  };
  const data = await getData();

  const quillData = JSON.parse(data.quillContents);
  const iconsData = JSON.parse(data.iconsData);
  const titleData = data.title;
  const artistData = data.artist;

  // console.log("quillData", quillData);

  return (
    <div className="max-w-[1280px] min-h-svh mx-auto lg:px-4 ">
      <div className="flex justify-center mt-[24px] mb-[60px]">
        <EditArea
          quillData={quillData}
          iconsData={iconsData}
          titleData={titleData}
          artistData={artistData}
          id={params.id}
        ></EditArea>
      </div>
    </div>
  );
};

export default Editor;
