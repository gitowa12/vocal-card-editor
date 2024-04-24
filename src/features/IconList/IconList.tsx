import React from "react";
import { Icons } from "./Icons";

const IconList = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
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
      className={`shadow bg-white rounded-xl border lg:p-3 xl:p-4`}
      onDragStart={(e) => handleDragStart(e)}
      // onDragEnd={handleDragEnd}
    >
      <div className="hidden lg:block">
        <p className="font-bold lg:mb-1 xl:mb-2 xl:text-xl ">テクニック</p>
      </div>

      <div className=" flex justify-center flex-wrap lg:justify-between ">
        {Icons.map((icon) => (
          <div key={icon.name} className="flex items-center">
            <div className=" lg:w-[150px] flex items-center">
              <div className="size-9 xl:size-10 my-1 lg:m-1 rounded-full border bg-neutral-100 flex justify-center items-center">
                <img
                  id={icon.name}
                  className={`cursor-pointer p-1 ${
                    icon.className !== "" ? `${icon.className}` : "w-[28px]"
                  }`}
                  draggable="true"
                  src={icon.src}
                  alt={icon.name}
                ></img>
              </div>
              <p className=" hidden  lg:inline lg:text-sm lg:font-semibold xl:text-base">
                {icon.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconList;
