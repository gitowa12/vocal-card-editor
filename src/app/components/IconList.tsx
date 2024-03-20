import React from "react";

const IconList = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const imageSrc = e.target.src; // ドラッグされた画像のsrcを取得
    e.dataTransfer.setData("imageSrc", imageSrc); // 転送データに画像のsrcをセット
    // const imagesrc = e.dataTransfer.getData(imageSrc);
    // console.log(imageSrc);
  };

  return (
    <div className="mt-4 p-1 border border-blue-500 flex gap-5 fixed">
      <div id="icons" className="flex w-fit" onDragStart={(e) => handleDragStart(e)}>
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
  );
};

export default IconList;
