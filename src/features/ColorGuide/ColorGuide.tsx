import React from "react";
import Color from "./Color";

const ColorGuide = () => {
  return (
    <div id="Highlight " className=" p-3 bg-white border border-neutral-300 ">
      <p className="mb-2 text-xl font-bold">カラーガイド</p>
      <div className="flex flex-col gap-2">
        {Color.map((el) => (
          <p style={{ backgroundColor: el.colorCode }} className="p-1 ">
            {el.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ColorGuide;
