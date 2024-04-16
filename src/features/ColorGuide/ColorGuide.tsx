import React from "react";
import Color from "./Color";

const ColorGuide = () => {
  return (
    <div id="Highlight " className="  bg-white border rounded-lg p-4">
      <p className="mb-3 text-xl font-bold">カラーガイド</p>
      <div className="flex flex-col gap-2">
        {Color.map((el) => (
          <p key={el.colorCode} style={{ backgroundColor: el.colorCode }} className="p-1 rounded">
            {el.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ColorGuide;
