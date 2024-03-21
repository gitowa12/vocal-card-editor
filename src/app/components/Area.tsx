import React, { useEffect, useRef, useState } from "react";

const Area = () => {
  const textAreaRef = useRef(null);

  return (
    <div
      ref={textAreaRef}
      contentEditable="true"
      onDrop={(e) => e.preventDefault()}
      className=" z-10 bg-white absolute w-[700px] min-h-[700px] outline-none border border-slate-500 rounded-xl p-1"
    ></div>
  );
};

export default Area;
