"use client";

import React from "react";
import IconList from "../components/IconList";
import EditArea from "../components/EditArea";

const Editor = () => {
  return (
    <div className="w-[1200px] h-fit m-auto flex  justify-center bg-slate-300">
      <div className="w-[700px] h-fit mr-3">
        <EditArea></EditArea>
      </div>

      <div className="w-[300px]">
        <IconList></IconList>
      </div>
    </div>
  );
};

export default Editor;
