import React from "react";

const TitleArea = () => {
  return (
    <div className="flex flex-col  ">
      <div className="">
        <input
          type="text"
          className="text-3xl outline-none w-[700px] mb-2 bg-neutral-100
          "
          placeholder="タイトル"
        />
      </div>
      <div>
        <input
          type="text"
          className="outline-none w-[700px] bg-neutral-100"
          placeholder="アーティスト"
        />
      </div>
    </div>
  );
};

export default TitleArea;
