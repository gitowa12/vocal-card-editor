"use client";

import React, { ReactHTMLElement, useEffect, useState } from "react";
import Color from "./ColorGuide/Color";
import { iconList } from "./IconList/IconList";
import IconList from "./IconList/IconList";
import ColorGuide from "./ColorGuide/ColorGuide";

// type IconList = {
//   name: string;
//   imageSrc: string;
// };

const SideBar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    //スクロールに追随
    const handleScroll = () => {
      const fixedScrollPosition = 85; // 例えばページ上部から200pxの位置
      if (window.scrollY > fixedScrollPosition) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // //全体のテキストサイズの調整
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   try {
  //     const qlEditor = document.querySelector(".ql-editor") as HTMLElement | null;

  //     if (!qlEditor) {
  //       console.error("ql-editorクラスを持つ要素が見つかりません。");
  //       return;
  //     }

  //     qlEditor.style.fontSize = ""; // 初期化（空文字列を設定）
  //     if (e.currentTarget.id === "16px") {
  //       qlEditor.style.fontSize = "16px";
  //       return;
  //     }
  //     if (e.currentTarget.id === "20px") {
  //       qlEditor.style.fontSize = "20px";
  //       return;
  //     }
  //   } catch {
  //     console.error(Error);
  //   }
  // };

  return (
    <div className={` w-[350px] flex flex-col gap-y-3 `}>
      {/* <div
        className={` w-[350px] flex flex-col gap-y-3 ${isFixed ? "fixed top-[87px] " : ""} `}
      > */}
      {/* <div className="bg-white border border-neutral-300 p-3">
          <p className="text-xl">テキストサイズ</p>
          <button id="16px" className="text-xl" onClick={handleClick}>
            a
          </button>
          <button id="20px" className="text-2xl" onClick={handleClick}>
            a
          </button>
        </div> */}

      <IconList></IconList>
      <ColorGuide></ColorGuide>
    </div>
  );
};

export default SideBar;
