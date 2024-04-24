import React from "react";
import Color from "./Color";

const ColorGuide = () => {
  return (
    <div id="Highlight" className="shadow hidden lg:block bg-white border rounded-xl p-3 xl:p-4">
      <p className="lg:mb-1 xl:mb-2 xl:text-xl font-bold">カラーガイド</p>
      <div className="grid gap-2 xl:grid-cols-2">
        {Color.map((el) => (
          <p
            key={el.colorCode}
            style={{ backgroundColor: el.colorCode }}
            className="rounded p-[2px] pl-1 font-semibold text-sm leading-tight xl:text-base xl:p-1"
          >
            {el.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ColorGuide;
