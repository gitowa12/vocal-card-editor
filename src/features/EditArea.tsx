"use client";

import React, { createElement, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import { channel } from "diagnostics_channel";
import { log } from "console";

// import QuillEditor from "../components/QuillEditor";

// Quillエディタをクライアントサイドでのみ読み込む
const QuillEditor = dynamic(() => import("./QuillEditor/QuillEditor"), {
  ssr: false,
});

type ImageInfo = {
  id: string;
  src: string;
  className: string;
  x: number;
  y: number;
};

// type Contents = {
//   id: string;
//   contents: string;
// };

const EditArea: React.FC = ({ beforeData }) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const iconsAreaRef = useRef<HTMLDivElement | null>(null);
  const parentNodeRef = useRef<HTMLDivElement | null>(null);
  const deleteBoxRef = useRef<HTMLDivElement | null>(null);
  const quillParentRef = useRef<HTMLDivElement | null>(null);
  const [quillContents, setQuillContents] = useState<any | null>(beforeData || null);
  // console.log(images);
  console.log(beforeData);

  useEffect(() => {
    console.log("quillContents", quillContents);
  }, [quillContents]);

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
    // console.log(quillParentRef.current);
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
    const imageId = e.dataTransfer.getData("imageId");
    const imageSrc = e.dataTransfer.getData("imageSrc");
    const imageClassName = e.dataTransfer.getData("imageClassName");
    // console.log(imageClassName);

    const imageX = e.dataTransfer.getData("imageX");
    const imageY = e.dataTransfer.getData("imageY");
    const X = e.nativeEvent.offsetX - parseFloat(imageX);
    const Y = e.nativeEvent.offsetY - parseFloat(imageY);

    //アイコンリストからのドロップ（初回設置）
    if (firstTime === "yes") {
      if (imageSrc) {
        const newImage = {
          id: uuidv4(),
          src: imageSrc,
          className: imageClassName,
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

    refChangeZindex(iconsAreaRef, 0);
  };

  //ドラッグを始めた要素の情報をdataTransferにセット
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    //アイコンエリアを前面に移動
    refChangeZindex(iconsAreaRef, 20);

    //再配置用にカーソルと画像の相対距離を計算
    const target = e.target as HTMLImageElement;
    const targetRect = target.getBoundingClientRect();
    const imageX = e.clientX - targetRect.left;
    const imageY = e.clientY - targetRect.top;

    e.dataTransfer.setData("firstTime", "no");
    e.dataTransfer.setData("imageId", target.id);
    e.dataTransfer.setData("imageX", imageX.toString());
    e.dataTransfer.setData("imageY", imageY.toString());

    setIsDragging(true); //ドラッグ中はゴミ箱を表示
  };

  //ドラッグが終わればゴミ箱を非表示
  const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
    setIsDragging(false);
    refChangeZindex(iconsAreaRef, 0);
  };

  //アイコンの削除処理
  const handleDeleteDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("imageId");
    setImages(images.filter((image) => image.id !== id));
    setIsDragging(false); //ゴミ箱に入ったら非表示
    refChangeZindex(iconsAreaRef, 0);
  };

  //refとzindexの数値を指定して処理する関数。何度も使うから関数化。
  const refChangeZindex = (ref: React.RefObject<HTMLElement>, zIndexValue: number) => {
    const element = ref.current;
    if (element) {
      element.style.zIndex = zIndexValue.toString();
    }
  };

  const handleTitleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    refChangeZindex(iconsAreaRef, 0);
  };

  const handleParentSetState = (newValue: string) => {
    const obj = {
      id: quillContents.id,
      contents: newValue,
    };
    setQuillContents(obj);
    // setQuillContents(obj);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.from("quillData").insert(quillContents);
      if (error) throw error;
      console.log("Save successful"); // エラーがなければ保存成功のメッセージを出力
    } catch (error) {
      // 実際に捕捉されたエラーオブジェクトをログに記録
      console.error("Save failed:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <div className="">
          <input
            type="text"
            className="w-[800px] text-3xl outline-none  mb-2  bg-neutral-100 "
            placeholder="タイトル"
            onDrop={handleTitleDrop}
          />
        </div>
        <div>
          <input
            type="text"
            className="w-[800px] outline-none  bg-neutral-100"
            placeholder="アーティスト"
            onDrop={handleTitleDrop}
          />
        </div>
      </div>
      <div className="w-[1200px] flex justify-between">
        <div ref={parentNodeRef} className="w-[800px] relative min-h-[700px] mr-4">
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
              className={`z-30 ${image.className}`}
              alt=""
            />
          ))}

          <div ref={quillParentRef} className="z-10 absolute bg-white w-[800px] ">
            <QuillEditor
              handleParentSetState={handleParentSetState}
              quillContents={quillContents}
            ></QuillEditor>
          </div>

          <div
            ref={deleteBoxRef}
            className={`z-30 transition-all duration-300 ease-in-out border-2 border-red-600 bg-white rounded-full p-2 fixed left-1/2 ${
              isDragging ? "top-[80px]" : "-top-[80px]" // ドラッグ中のみ表示
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDeleteDrop(e)}
          >
            <img src="/ゴミ箱-赤.png" className="size-8" alt="" />
          </div>
        </div>
        <div className="w-[350px]">
          <div>
            <button
              className=" px-6 py-3  bg-blue-400 rounded-lg mb-3 text-white"
              onClick={handleSave}
            >
              保存する
            </button>
          </div>
          <SideBar></SideBar>
        </div>
      </div>
    </div>
  );
};

export default EditArea;
