"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Quillのスタイルシート
import "quill/dist/quill.bubble.css"; // Quillのスタイルシート
import "../styles/quill.scss";
import Color from "./color/Color";

const toolbarOptions = [
  [
    // { color: ["coral", "lightskyblue", "gold", "lightgreen", "lightgray"] },
    // { background: ["coral", "lightskyblue", "gold", "lightgreen", "lightgray"] },
  ], // dropdown with defaults from theme
  ["bold", "underline"], // toggled buttons
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  ["clean"], // remove formatting button
];

const QuillEditor = () => {
  const containerRef = useRef(null);
  const toolbarRef = useRef(null);
  const editorRef = useRef(null);
  const [toolbarDisplay, setToolbarDisplay] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!editorRef.current) return;
    const quill = new Quill(editorRef.current, {
      theme: "bubble",
      placeholder: "ここから入力してね",
      modules: {
        // toolbar: toolbarRef.current,
        toolbar: toolbarOptions,
      },
      //入力を制限
      formats: [
        "color",
        "background",
        "bold",
        "underline",
        "script",
        "size",
        "indent",
        // "link",
        // "image", // ここで`image`を削除すると画像の挿入が無効になります
      ],
    });

    // エディタのコンテンツをリセットする
    quill.setContents([{ insert: "\n" }]);
    editorRef.current.quill = quill;

    // ツールバーの要素を選択
    // const toolbarElement = document.querySelector(".ql-toolbar");
    // toolbarElement.classList.add("bg-neutral-700", "rounded", "p-1");
    // const qlFormats = document.getElementsByClassName("ql-formats");
    // console.log(qlFormats);

    // Array.from(qlFormats).forEach((element) => {
    //   // border-top スタイルを削除
    //   element.style.margin = "0";
    // });

    // // エディタ内でのマウスアップイベントに基づいてツールバーの位置を設定
    // const showToolbar = () => {
    //   const containerRect = containerRef.current.getBoundingClientRect();
    //   const x = containerRect.x;
    //   const y = containerRect.y;

    //   const selection = document.getSelection();
    //   if (!selection.isCollapsed) {
    //     // テキストが選択されている場合
    //     const rect = selection.getRangeAt(0).getBoundingClientRect();

    //     setToolbarPosition({ x: rect.x - x + 4, y: rect.y - y - 32 }); // ツールバーの位置を選択範囲の上に設定
    //     setToolbarDisplay(true);
    //   } else {
    //     setToolbarDisplay(false);
    //   }
    // };

    // editorRef.current.addEventListener("mouseup", showToolbar);
    // return () => editorRef.current.removeEventListener("mouseup", showToolbar);

    const buttonContainer = document.createElement("span");
    buttonContainer.classList.add("ql-formats");
    const colors = [
      Color.red,
      Color.cyan,
      Color.green,
      Color.orange,
      Color.yellow,
      Color.blue,
      Color.purple,
      Color.pink,
      Color.slate,
      Color.neutral,
    ];
    colors.forEach((el) => {
      const customButton = document.createElement("button");
      customButton.value = el;
      customButton.style.width = "16px";
      customButton.style.height = "16px";
      customButton.style.margin = "2px";
      customButton.style.backgroundColor = el;
      customButton.onclick = (e) => {
        // ボタンがクリックされたときの動作を定義
        const color = e.target.value;

        quill.format("background", color);
        console.log("カスタムボタンがクリックされました");
      };
      buttonContainer.appendChild(customButton);
    });

    // カスタムボタンをツールバーに追加
    const toolbar = document.querySelector(".ql-toolbar");

    const firstChild = toolbar.firstChild;

    // カスタムボタンをツールバーの先頭に追加
    toolbar.insertBefore(buttonContainer, firstChild);
  }, []);

  return (
    <div id="editor-container" className="relative  " ref={containerRef}>
      <div ref={editorRef} className=" min-h-[700px] border border-neutral-300 "></div>
    </div>
  );
};

export default QuillEditor;
