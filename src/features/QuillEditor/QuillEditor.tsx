"use client";

import React, { ReactHTMLElement, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Quillのスタイルシート
import "quill/dist/quill.bubble.css"; // Quillのスタイルシート
import "./quill.scss";
import Color from "../ColorGuide/Color";
import { NotoSansJP, YuGothic } from "../../styles/fonts";
import { supabase } from "../supabaseClient";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";

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

// HTMLDivElementにquillプロパティをオプショナルで追加する型を定義
type EditorElement = HTMLDivElement & { quill?: Quill };

const QuillEditor = ({ handleParentSetState, quillContents }) => {
  const containerRef = useRef(null);
  const editorRef = useRef<EditorElement>(null);

  console.log("parse後", JSON.parse(quillContents));

  useEffect(() => {
    if (!editorRef.current) return;
    const quill: Quill = new Quill(editorRef.current, {
      theme: "bubble",
      placeholder: "ここから入力してね",
      modules: {
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
    editorRef.current.quill = quill;

    // エディタのコンテンツをリセットする
    quill.setContents([{ insert: "\n" }]);
    //前回データをセット
    const beforeData = JSON.parse(quillContents);
    quill.setContents(beforeData);

    //入力変更イベントリスナー
    quill.on("text-change", () => {
      const contents = quill.getContents();
      // console.log(contents);
      // console.log(JSON.stringify(contents));
      handleParentSetState(JSON.stringify(contents)); // HTML内容をstateに保存
    });

    const buttonContainer = document.createElement("span");
    buttonContainer.classList.add("ql-formats");

    Color.forEach((el) => {
      const customButton = document.createElement("button");
      customButton.value = el.colorCode;
      customButton.style.width = "16px";
      customButton.style.height = "16px";
      customButton.style.margin = "2px";
      // console.log(el);

      customButton.style.backgroundColor = el.colorCode;
      customButton.onclick = (e) => {
        const target = e.target as HTMLButtonElement;
        // ボタンがクリックされたときの動作を定義
        const color = target.value;

        quill.format("background", color);
        // console.log("カスタムボタンがクリックされました");
      };
      buttonContainer.appendChild(customButton);
    });

    // カスタムボタンをツールバーに追加
    const toolbar = document.querySelector(".ql-toolbar");
    if (!toolbar) return;
    const firstChild = toolbar.firstChild;

    // カスタムボタンをツールバーの先頭に追加
    toolbar.insertBefore(buttonContainer, firstChild);
  }, []);

  return (
    <div id="editor-container" className="relative" ref={containerRef}>
      <div
        ref={editorRef}
        className={` min-h-[700px] border border-neutral-300 ${YuGothic.className} `}
      ></div>
    </div>
  );
};

export default QuillEditor;
