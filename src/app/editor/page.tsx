"use client";

import EditArea from "@/features/EditArea";
import SideBar from "@/features/SideBar";
import React from "react";

const Editor = () => {
  return (
    <div className="">
      <div className="w-[1200px]  mx-auto py-7 flex  justify-center ">
        {/* <DownloadPDFButton></DownloadPDFButton> */}

        <div className="w-[800px] mr-4">
          <EditArea></EditArea>
        </div>
        <div className="w-[350px]">
          <SideBar></SideBar>
        </div>
      </div>
    </div>
  );
};

export default Editor;
