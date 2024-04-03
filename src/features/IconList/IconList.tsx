import React from "react";
// import { iconList } from "./IconsList";

const iconList = [
  {
    name: "ブレス",
    src: "/ブレス.svg",
    className: "",
  },
  {
    name: "区切り",
    src: "/区切り.svg",
    className: "",
  },
  {
    name: "アクセント",
    src: "/アクセント.svg",
    className: "size-4",
  },
  {
    name: "ビブラート",
    src: "/ビブラート.svg",
    className: "",
  },
  {
    name: "フォール",
    src: "/フォール.svg",
    className: "",
  },
  {
    name: "ロングトーン",
    src: "/ロングトーン.svg",
    className: "",
  },
  {
    name: "しゃくり",
    src: "/しゃくり.svg",
    className: "",
  },
  {
    name: "こぶし",
    src: "/こぶし.svg",
    className: "",
  },
  {
    name: "ファルセット",
    src: "/ファルセット.svg",
    className: "",
  },
];

const IconList = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    const imageSrc = target.src; // ドラッグされた画像のsrcを取得
    const imageClassName = target.className;
    const targetRect = target.getBoundingClientRect();
    const imageX = e.clientX - targetRect.left;
    const imageY = e.clientY - targetRect.top;

    e.dataTransfer.setData("firstTime", "yes"); //アイコンリストからのドラッグなので、初回フラグをセット
    e.dataTransfer.setData("imageSrc", imageSrc); // 転送データに画像のsrcをセット
    e.dataTransfer.setData("imageClassName", imageClassName); // 転送データに画像のclassnameをセット
    e.dataTransfer.setData("imageX", imageX.toString()); // 転送データに画像のsrcをセット
    e.dataTransfer.setData("imageY", imageY.toString()); // 転送データに画像のsrcをセット

    const editArea = document.getElementById("iconsArea");
    if (editArea) {
      editArea.style.zIndex = "20";
    }
    // console.log("動いてるよ");
  };

  return (
    <div
      id="icons"
      className={`bg-white border border-neutral-300 p-3`}
      onDragStart={(e) => handleDragStart(e)}
      // onDragEnd={handleDragEnd}
    >
      <p className="mb-1 text-xl font-bold">テクニック</p>
      <div className=" flex flex-wrap justify-between">
        {iconList.map((icon) => (
          <div key={icon.name} className="flex items-center">
            <div className="w-[150px] flex items-center">
              <div className=" size-11 m-1 p-2 rounded-full bg-neutral-200 flex justify-center items-center">
                <img
                  id={icon.name}
                  className={icon.className !== "" ? `${icon.className}` : "size-7"}
                  src={icon.src}
                  draggable="true"
                  alt={icon.name}
                ></img>
              </div>
              <p className="text-sm">{icon.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconList;
