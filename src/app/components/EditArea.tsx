import React, { useRef, useState } from "react";
import TextArea from "./TextArea";
import { v4 as uuidv4 } from "uuid";

type ImageInfo = {
  id: string;
  src: string;
  x: number;
  y: number;
};

const EditArea: React.FC = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を追跡
  const deleteBoxRef = useRef<HTMLDivElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const imageSrc = e.dataTransfer.getData("imageSrc");
    console.log(e);
    if (imageSrc) {
      const newImage = {
        id: uuidv4(),
        src: imageSrc,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
      setImages([...images, newImage]);
      console.log(newImage);
    }
  };

  const dragEnd = (e: React.DragEvent<HTMLImageElement>) => {
    // console.log(e.target);
    //アイコンのidと移動後の位置情報を取得 ※位置情報は移動前位置からの相対位置
    const id = e.target.id;
    const movedX = e.nativeEvent.offsetX;
    const movedY = e.nativeEvent.offsetY;
    updateImagePosition(id, movedX, movedY);

    //ドラッグが終わればゴミ箱を非表示
    setIsDragging(false);

    // const deleteBox = deleteBoxRef.current;
    // deleteBox.className = "transition bg-red-400 rounded-lg w-16 h-16 fixed top-[150px] left-1/2 ";
  };

  const updateImagePosition = (id: string, addX: number, addY: number) => {
    //idでstateから検索して、位置情報を更新してセットする
    setImages(
      images.map((image) => {
        if (image.id === id) {
          // console.log(image);
          const newX = image.x + addX;
          const newY = image.y + addY;

          return { ...image, x: newX, y: newY };
        } else {
          return image;
        }
      })
    );
  };

  //削除用にIDをdataTransferにセット
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    const id = e.target.id;
    e.dataTransfer.setData("id", id);
    //ドラッグ中はゴミ箱を表示
    setIsDragging(true);
  };

  const handleDeleteDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");
    console.log(id);
    setImages(images.filter((image) => image.id !== id));
    //ゴミ箱に入ったら非表示
    setIsDragging(false);
  };

  return (
    <div>
      <div
        id="editor"
        className="mt-4 h-fit relative"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
      >
        {images.map((image, index) => (
          <img
            key={index}
            id={image.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e)}
            onDragEnd={(e) => dragEnd(e)}
            src={image.src}
            className="w-3"
            style={{
              position: "absolute",
              left: `${image.x}px`,
              top: `${image.y}px`,
            }}
            alt=""
          />
        ))}
        <TextArea></TextArea>
      </div>
      <div
        ref={deleteBoxRef}
        className={`transition-all duration-300 ease-in-out bg-red-400 rounded-xl p-2 h-10 fixed left-1/2 ${
          isDragging ? "top-[50px]" : "-top-[50px]" // ドラッグ中のみ表示
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDeleteDrop(e)}
      >
        ゴミ箱
      </div>
    </div>
  );
};

export default EditArea;
