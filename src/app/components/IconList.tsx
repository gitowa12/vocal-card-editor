import React, { useState } from "react";

const IconList = () => {
  const [editLayer, setEditLayer] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    const imageSrc = target.src; // ドラッグされた画像のsrcを取得
    e.dataTransfer.setData("imageSrc", imageSrc); // 転送データに画像のsrcをセット
    // const imagesrc = e.dataTransfer.getData(imageSrc);
    // console.log(imageSrc);
    const editArea = document.getElementById("editor");
    if (editArea) {
      editArea.style.zIndex = "30";
    }
    console.log("動いてるよ");
    // console.log(editArea);
    // setEditLayer(true)
  };

  const handleDragEnd = () => {
    const editArea = document.getElementById("editor");
    if (editArea) {
      editArea.style.zIndex = "0";
    }
    console.log(editArea);
  };

  return (
    <div>
      <div id="Advertisement " className="w-[300px] h-[300px] bg-neutral-300"></div>
      <div className="mt-4 p-1 border border-blue-500 flex gap-5 fixed">
        <div
          id="icons"
          className="flex w-fit"
          onDragStart={(e) => handleDragStart(e)}
          onDragEnd={handleDragEnd}
        >
          <img
            className="w-8"
            src="http://localhost:3000/breath.png"
            draggable="true"
            alt="breath"
          ></img>
          <img
            className="w-8"
            src="http://localhost:3000/separator.png"
            draggable="true"
            alt="breath"
          ></img>
          <img
            className="w-8"
            src="http://localhost:3000/breath.png"
            draggable="true"
            alt="breath"
          ></img>
          <img
            className="w-8"
            src="http://localhost:3000/breath.png"
            draggable="true"
            alt="breath"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default IconList;
