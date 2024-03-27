"use client";

import React from "react";
import IconList from "../components/SideBar";
import EditArea from "../components/EditArea";
import TitleArea from "../components/TitleArea";
import QuillEditor from "../components/QuillEditor";
import SideBar from "../components/SideBar";

const Editor = () => {
  return (
    <div className="">
      <div className="w-[1200px]  mx-auto py-7 flex justify-center ">
        <div className="w-[800px] mr-4">
          <div className="mb-4">
            <TitleArea></TitleArea>
          </div>
          <div>
            <EditArea></EditArea>
          </div>
        </div>
        <div className="w-[300px]">
          <SideBar></SideBar>
        </div>
      </div>
    </div>
  );
};

export default Editor;
