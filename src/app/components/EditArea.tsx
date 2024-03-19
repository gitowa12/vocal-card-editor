import React, { useState } from "react";
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const imageSrc = e.dataTransfer.getData("imageSrc");
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
    console.log(e.target);
    const id = e.target.id;
    const movedX = e.nativeEvent.offsetX;
    const movedY = e.nativeEvent.offsetY;
    updateImagePosition(id, movedX, movedY);
  };

  const updateImagePosition = (id: string, addX: number, addY: number) => {
    setImages(
      images.map((image) => {
        if (image.id === id) {
          console.log(image);
          const newX = image.x + addX;
          const newY = image.y + addY;

          return { ...image, x: newX, y: newY };
        } else {
          return image;
        }
      })
    );
  };

  // 例: IDが2の画像の位置を更新

  return (
    <div>
      <div
        id="editor"
        className="mt-4 h-fit relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {images.map((image, index) => (
          <img
            key={index}
            id={image.id}
            draggable="true"
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
        <TextArea />
      </div>
    </div>
  );
};

export default EditArea;
