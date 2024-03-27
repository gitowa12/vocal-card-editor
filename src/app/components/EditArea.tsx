"use client";

import React, { createElement, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
// import QuillEditor from "../components/QuillEditor";
// Quillエディタをクライアントサイドでのみ読み込む
const QuillEditor = dynamic(() => import("../components/QuillEditor"), {
  ssr: false,
});

type ImageInfo = {
  id: string;
  src: string;
  x: number;
  y: number;
};

const EditArea: React.FC = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const iconsAreaRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLDivElement | null>(null);
  const parentNodeRef = useRef<HTMLDivElement | null>(null);
  const deleteBoxRef = useRef<HTMLDivElement | null>(null);
  const quillParentRef = useRef<HTMLDivElement | null>(null);

  //MutationObserverを使って
  //textAreaの高さを監視して、iconsAreaの高さもtextAreaに同期させる
  const config = {
    childList: true, //「子ノード（テキストノードも含む）」の変化
    attributes: true, //「属性」の変化
    characterData: true, //「テキストノード」の変化
    subtree: true,
  };
  useEffect(() => {
    //Quill内のテキストに合わせてページの高さを変更する処理
    console.log(quillParentRef.current);
    if (quillParentRef.current) {
      const quillParentHeightObserver = new MutationObserver((record, observer) => {
        // const textAreaHeight = textAreaRef.current?.offsetHeight;
        const quillParentHeight = quillParentRef.current?.clientHeight;
        const parentNode = parentNodeRef.current;
        const iconsArea = iconsAreaRef.current;
        if (parentNode) {
          parentNode.style.height = `${quillParentHeight}px`;
        }
        if (iconsArea) {
          iconsArea.style.height = `${quillParentHeight}px`;
        }
      });
      quillParentHeightObserver.observe(quillParentRef.current, config);
      // クリーンアップ関数でobserverを切断する
      return () => quillParentHeightObserver.disconnect();
    }
  }, []);

  useEffect(() => {}, []); // 空の依存配列を追加

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  //アイコンドロップ時の処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const firstTime = e.dataTransfer.getData("firstTime");
    console.log(firstTime);

    const imageId = e.dataTransfer.getData("imageId");
    const imageSrc = e.dataTransfer.getData("imageSrc");
    const imageX = parseFloat(e.dataTransfer.getData("imageX"));
    const imageY = parseFloat(e.dataTransfer.getData("imageY"));
    const X = e.nativeEvent.offsetX - imageX;
    const Y = e.nativeEvent.offsetY - imageY;

    //アイコンリストからのドロップ
    if (firstTime === "yes") {
      if (imageSrc) {
        const newImage = {
          id: uuidv4(),
          src: imageSrc,
          x: X,
          y: Y,
        };
        setImages([...images, newImage]);
      }
      e.dataTransfer.setData("firstTime", "no");
    }
    //再配置のドロップ
    if (firstTime === "no") {
      setImages(
        images.map((image) => {
          if (image.id === imageId) {
            return { ...image, x: X, y: Y };
          } else {
            return image;
          }
        })
      );
    }
    const iconsArea = iconsAreaRef.current;
    iconsArea.style.zIndex = 0;
  };

  //ドラッグを始めた要素の情報をdataTransferにセット
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    //アイコンエリアを前面に移動
    const iconsArea = iconsAreaRef.current;
    iconsArea.style.zIndex = 20;

    //再配置用にカーソルと画像の相対距離を計算
    const targetRect = e.target.getBoundingClientRect();
    const imageX = e.clientX - targetRect.left;
    const imageY = e.clientY - targetRect.top;

    e.dataTransfer.setData("firstTime", "no");
    e.dataTransfer.setData("imageId", e.target.id);
    e.dataTransfer.setData("imageX", imageX);
    e.dataTransfer.setData("imageY", imageY);

    setIsDragging(true); //ドラッグ中はゴミ箱を表示
  };

  //ドラッグが終わればゴミ箱を非表示
  const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
    setIsDragging(false);
    const iconsArea = iconsAreaRef.current;
    iconsArea.style.zIndex = 0;
  };

  //アイコンの削除処理
  const handleDeleteDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("imageId");
    setImages(images.filter((image) => image.id !== id));
    setIsDragging(false); //ゴミ箱に入ったら非表示

    const iconsArea = iconsAreaRef.current;
    iconsArea.style.zIndex = 0;
  };

  return (
    <div ref={parentNodeRef} className="relative min-h-[700px] my-3 ">
      <div
        ref={iconsAreaRef}
        id="iconsArea"
        className="absolute z-0 w-[800px] min-h-[700px] overflow-hidden "
        // contentEditable="true"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
      ></div>
      {images.map((image, index) => (
        <img
          key={index}
          id={image.id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e)}
          onDragEnd={(e) => handleDragEnd(e)}
          src={image.src}
          style={{
            position: "absolute",
            left: `${image.x}px`,
            top: `${image.y}px`,
          }}
          className={`size-6 z-30 cursor-grab `}
          alt=""
        />
      ))}

      <div ref={quillParentRef} className="z-10 absolute bg-white w-[800px] ">
        <QuillEditor></QuillEditor>
      </div>

      <div
        ref={deleteBoxRef}
        className={`z-30 transition-all duration-300 ease-in-out border-2 border-red-600 bg-white rounded-full p-2 fixed left-1/2 ${
          isDragging ? "top-[80px]" : "-top-[80px]" // ドラッグ中のみ表示
        }`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDeleteDrop(e)}
      >
        <img src="http://localhost:3000/ゴミ箱-赤.png" className="size-8" alt="" />
      </div>
    </div>
  );
};

export default EditArea;

const hoge = document.getElementById("756f4b76-999d-46ea-ae18-8bcd00ee0196");
console.log(hoge?.style.left);
