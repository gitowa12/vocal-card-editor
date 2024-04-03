"use client";

import EditArea from "@/features/EditArea";
import SideBar from "@/features/SideBar";
import React from "react";

const Editor = () => {
  return (
    <div className="">
      <div className="w-[1200px]  mx-auto py-7 ">
        <div className=" min-h-screen">
          <EditArea></EditArea>
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
