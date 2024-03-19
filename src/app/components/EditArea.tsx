import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/editor.module.scss";
import TextArea from "./TextArea";

const EditArea = () => {
  const [img, setImg] = useState({});
  useEffect(() => {
    // console.log(img);
  }, [img]);
  // ドラッグ可能な画像を作成し、エディタ内に配置する関数

  // エディタに対するドロップイベント（再配置用）
  const handleDragOver = (e: { preventDefault: () => void } | undefined) => {
    e.preventDefault(); // デフォルトの挙動をキャンセル
  };

  const handleDrop = (e) => {
    const imageSrc = e.dataTransfer.getData("imageSrc");
    console.log(e);
    e.preventDefault();
    if (imageSrc) {
      createDraggableImage(e.nativeEvent.offsetX, e.nativeEvent.offsetY, imageSrc);
    }
  };

  function createDraggableImage(x: string, y: string, src: string) {
    const img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.style.left = x + "px";
    img.style.top = y + "px";
    // console.log(img.style.left);
    img.draggable = true;
    console.log(img);
    setImg(img);
    document.getElementById("editor").appendChild(img);
  }

  return (
    <div>
      <div
        id="editor"
        className=" mt-4 h-fit  relative [&>img]:w-3 "
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <TextArea></TextArea>
      </div>
    </div>
  );
};

export default EditArea;
