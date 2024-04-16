import React from "react";
import { Icons } from "./Icons";

const IconList = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    const name = target.id;
    const imageSrc = target.src; // ドラッグされた画像のsrcを取得
    const imageClassName = target.className;
    const targetRect = target.getBoundingClientRect();
    const imageX = e.clientX - targetRect.left;
    const imageY = e.clientY - targetRect.top;

    e.dataTransfer.setData("firstTime", "yes"); //アイコンリストからのドラッグなので、初回フラグをセット
    e.dataTransfer.setData("name", name); //アイコンリストからのドラッグなので、初回フラグをセット
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
      className={`bg-white rounded-lg border p-4`}
      onDragStart={(e) => handleDragStart(e)}
      // onDragEnd={handleDragEnd}
    >
      <p className="mb-1 text-xl font-bold">テクニック</p>
      <div className=" flex flex-wrap justify-between">
        {Icons.map((icon) => (
          <div key={icon.name} className="flex items-center">
            <div className="w-[150px] flex items-center">
              <div className="size-10 m-1  rounded-full  border bg-neutral-100  flex justify-center items-center">
                <img
                  id={icon.name}
                  className={`${icon.className !== "" ? `${icon.className}` : "size-6"}`}
                  src={icon.src}
                  draggable="true"
                  alt={icon.name}
                ></img>
              </div>
              <p className="">{icon.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconList;
