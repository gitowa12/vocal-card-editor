import EditArea from "@/features/EditArea";
import SideBar from "@/features/SideBar";
import React from "react";

const Editor = async ({ params }: { params: { id: string } }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/${params.id}/`, { method: "GET", cache: "no-store" });
  // console.log(res);
  const result = await res.json();
  console.log(result);
  return (
    <div className="">
      <div className="w-[1200px]  mx-auto py-7 ">
        <div className=" min-h-screen">
          <EditArea quillData={result.contents} id={params.id}></EditArea>
        </div>
      </div>
      {/* <div className="w-[1200px]  mx-auto py-7 flex  justify-center ">
        <div className="w-[800px] mr-4 min-h-screen">
          <EditArea></EditArea>
        </div>
        <div className="w-[350px] ">
          <SideBar></SideBar>
        </div>
      </div> */}
    </div>
  );
};

export default Editor;
