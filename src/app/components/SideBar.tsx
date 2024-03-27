import { log } from "console";
import React, { useEffect, useState } from "react";
import Color from "./color/Color";

type IconList = {
  name: string;
  imageSrc: string;
};
const iconList = [
  {
    name: "ブレス",
    imageSrc: "http://localhost:3000/breath.png",
  },
  {
    name: "区切り",
    imageSrc: "http://localhost:3000/separator.png",
  },
  {
    name: "ビブラート",
    imageSrc: "http://localhost:3000/vibrato.png",
  },
];

const SideBar = () => {
  const [icons, setIcons] = useState<IconList[]>(iconList);
  const [editLayer, setEditLayer] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
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

  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  //   const target = e.target as HTMLImageElement;
  //   const imageSrc = target.src; // ドラッグされた画像のsrcを取得
  //   e.dataTransfer.setData("imageSrc", imageSrc); // 転送データに画像のsrcをセット
  //   // const imagesrc = e.dataTransfer.getData(imageSrc);
  //   // console.log(imageSrc);
  //   const editArea = document.getElementById("editor");
  //   if (editArea) {
  //     editArea.style.zIndex = "30";
  //   }
  //   console.log("動いてるよ");
  //   // console.log(editArea);
  //   // setEditLayer(true)
  // };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target;
    console.log(target);
    console.log(e.clientX);

    const targetRect = e.target.getBoundingClientRect();
    // console.log(targetRect.left);
    const imageX = e.clientX - targetRect.left;
    // console.log(imageX);
    const imageY = e.clientY - targetRect.top;

    const imageSrc = target.src; // ドラッグされた画像のsrcを取得
    e.dataTransfer.setData("firstTime", "yes");
    e.dataTransfer.setData("imageSrc", imageSrc); // 転送データに画像のsrcをセット
    e.dataTransfer.setData("imageX", imageX); // 転送データに画像のsrcをセット
    e.dataTransfer.setData("imageY", imageY); // 転送データに画像のsrcをセット

    const editArea = document.getElementById("iconsArea");
    if (editArea) {
      editArea.style.zIndex = "20";
    }
    console.log("動いてるよ");
    // console.log(editArea);
    // setEditLayer(true)
  };

  //全体のテキストサイズの調整
  const handleClick = (e) => {
    try {
      const qlEditor = document.querySelector(".ql-editor");

      if (!qlEditor) {
        console.error("ql-editorクラスを持つ要素が見つかりません。");
        return;
      }

      qlEditor.style.fontSize = "";
      if (e.target.id === "16px") {
        qlEditor.style.fontSize = "16px";
        return;
      }
      if (e.target.id === "20px") {
        qlEditor.style.fontSize = "20px";
        return;
      }
    } catch {
      console.error(error);
    }
  };

  return (
    <div className="mt-[84px]">
      {/* <div id="Advertisement " className="w-[300px] h-[300px] bg-neutral-300"></div> */}
      <div className={` w-[300px] flex flex-col gap-y-3 ${isFixed ? "fixed top-[87px] " : ""} `}>
        {/* <div className="bg-white border border-neutral-300 p-3">
          <p className="text-xl">テキストサイズ</p>
          <button id="16px" className="text-xl" onClick={handleClick}>
            a
          </button>
          <button id="20px" className="text-2xl" onClick={handleClick}>
            a
          </button>
        </div> */}
        <div
          id="icons"
          className={`bg-white border border-neutral-300 flex flex-wrap p-3 `}
          onDragStart={(e) => handleDragStart(e)}
          // onDragEnd={handleDragEnd}
        >
          {iconList.map((icon) => (
            <div className="flex flex-col items-center">
              <div className="m-1 p-2 rounded-full bg-slate-300">
                <img className="size-6 " src={icon.imageSrc} draggable="true" alt={icon.name}></img>
              </div>
              <p>{icon.name}</p>
            </div>
          ))}
        </div>
        <div
          id="Highlight "
          className="flex flex-col gap-2 p-3 bg-white border border-neutral-300 "
        >
          <p className="text-xl font-bold">ガイド</p>
          <p className="text-lg">カラー</p>
          <p style={{ backgroundColor: Color.red }} className="p-1 ">
            アクセント
          </p>
          <p style={{ backgroundColor: Color.cyan }} className="p-1 ">
            ファルセット
          </p>
          <p style={{ backgroundColor: Color.green }} className="p-1 ">
            ビブラート
          </p>
          <p style={{ backgroundColor: Color.yellow }} className="p-1 ">
            ロングトーン
          </p>
          <p style={{ backgroundColor: Color.purple }} className="p-1 ">
            ウィスパー
          </p>
          <p style={{ backgroundColor: Color.blue }} className="p-1 ">
            フォール
          </p>
          <p style={{ backgroundColor: Color.slate }} className="p-1 ">
            エッジボイス
          </p>
          <p style={{ backgroundColor: Color.neutral }} className="p-1 ">
            がなり
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
