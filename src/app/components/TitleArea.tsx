import React from "react";

const TitleArea = () => {
  return (
    <div className="flex flex-col  ">
      <div className="">
        <input
          type="text"
          className="w-[800px] text-3xl outline-none  mb-2  bg-neutral-100 "
          placeholder="タイトル"
        />
      </div>
      <div>
        <input
          type="text"
          className="w-[800px] outline-none  bg-neutral-100"
          placeholder="アーティスト"
        />
      </div>
    </div>
  );
};

export default TitleArea;
