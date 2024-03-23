"use client";

import React from "react";
import IconList from "../components/IconList";
import EditArea from "../components/EditArea";
import TitleArea from "../components/TitleArea";

const Editor = () => {
  return (
    <div className="bg-gray-100">
      <div className="w-[1200px] h-fit mx-auto py-7 flex justify-center bg-gray-100 ">
        <div className="w-[700px] h-fit mr-4">
          <div className="mb-4">
            <TitleArea></TitleArea>
          </div>
          <div>
            <EditArea></EditArea>
          </div>
        </div>
        <div className="w-[300px]">
          <IconList></IconList>
        </div>
      </div>
    </div>
  );
};

export default Editor;
