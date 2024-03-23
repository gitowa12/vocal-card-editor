import React, { createElement, useEffect, useRef, useState } from "react";
import TextArea from "./TextArea";
import { v4 as uuidv4 } from "uuid";
import Area from "./Area";
import { error, log } from "console";
import { after } from "node:test";

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
  const toolBarRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState("");

  //MutationObserverを使って
  //textAreaの高さを監視して、iconsAreaの高さもtextAreaに同期させる
  const config = {
    childList: true, //「子ノード（テキストノードも含む）」の変化
    attributes: true, //「属性」の変化
    characterData: true, //「テキストノード」の変化
    subtree: true,
  };
  useEffect(() => {
    if (textAreaRef.current) {
      const textAreaHeightObserver = new MutationObserver((record, observer) => {
        const textAreaHeight = textAreaRef.current?.offsetHeight;
        const iconsArea = iconsAreaRef.current;
        const parentNode = parentNodeRef.current;
        if (iconsArea) {
          iconsArea.style.height = `${textAreaHeight}px`;
        }
        if (parentNode) {
          parentNode.style.height = `${textAreaHeight}px`;
        }
      });
      textAreaHeightObserver.observe(textAreaRef.current, config);

      // クリーンアップ関数でobserverを切断する
      return () => textAreaHeightObserver.disconnect();
    }
  }, []);

  // const toolBar = document.createElement(div);

  useEffect(() => {}, []); // 空の依存配列を追加

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  //iconlistからドラッグしてきた要素の配置
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const imageSrc = e.dataTransfer.getData("imageSrc");
    // console.log(e);
    if (imageSrc) {
      const newImage = {
        id: uuidv4(),
        src: imageSrc,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
      setImages([...images, newImage]);
      // console.log(newImage);
    }
  };

  //削除用にIDをdataTransferにセット
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const id = target.id;
    e.dataTransfer.setData("id", id);
    //ドラッグ中はゴミ箱を表示
    setIsDragging(true);
  };

  //ドラッグ終了時にアイコンのいち情報を更新
  const handleDragEnd = (e: React.DragEvent<HTMLImageElement>) => {
    //アイコンのidと移動後の位置情報を取得 ※位置情報は移動前位置からの相対位置
    const target = e.target as HTMLImageElement;
    const id = target.id;
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

  const handleDeleteDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");
    // console.log(id);
    setImages(images.filter((image) => image.id !== id));
    //ゴミ箱に入ったら非表示
    setIsDragging(false);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");

    // 改行でテキストを分割
    const lines = text.split(/\r?\n/);

    const selection = document.getSelection();
    if (!selection.rangeCount) return; // カーソル位置がない場合は終了
    let range = selection.getRangeAt(0);
    range.deleteContents(); // 選択範囲をクリア

    // 各行に対して処理
    lines.forEach((line) => {
      // 新しいdiv要素を作成
      const newDiv = document.createElement("div");
      // 新しいspan要素を作成し、テキストを追加
      const newSpan = document.createElement("span");
      newSpan.innerText = line.length === 0 ? "\u00A0" : line; // 空行の場合はノーブレークスペース

      // spanをdivに追加
      newDiv.appendChild(newSpan);

      // 新しいdivに一意のIDを割り当て（uuidv4()関数の実装が必要）
      newDiv.id = uuidv4();

      // 現在のRangeの終わりに新しいdivを挿入
      range.insertNode(newDiv);
      range = document.createRange(); // 新しいRangeを作成
      range.setStartAfter(newDiv); // 新しいdivの後ろにカーソルを移動
    });

    // 最後に挿入されたdivの後ろにカーソルを更新
    selection.removeAllRanges(); // 現在の選択をクリア
    selection.addRange(range); // 新しい範囲を選択範囲として設定
  };

  return (
    <div>
      <div ref={parentNodeRef} className="relative w-[700px] min-h-[700px] my-3 overflow-hidden">
        <div
          ref={iconsAreaRef}
          id="editor"
          className="absolute z-0  h-fit w-[700px]  min-h-[700px]  "
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
            className="w-3 z-30"
            style={{
              position: "absolute",
              left: `${image.x}px`,
              top: `${image.y}px`,
            }}
            alt=""
          />
        ))}
        <div
          ref={textAreaRef}
          id="textArea"
          contentEditable="true"
          onDrop={(e) => e.preventDefault()}
          onPaste={(e) => handlePaste(e)}
          // onChange={console.log("Hello")}
          className=" z-10 bg-white absolute w-[700px] min-h-[700px] outline-none  p-2"
        ></div>
        <div
          ref={deleteBoxRef}
          className={`z-30 transition-all duration-300 ease-in-out bg-red-400 rounded-xl p-2 h-10 fixed left-1/2 ${
            isDragging ? "top-[50px]" : "-top-[50px]" // ドラッグ中のみ表示
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDeleteDrop(e)}
        >
          ゴミ箱
        </div>
      </div>
    </div>
  );
};

export default EditArea;
