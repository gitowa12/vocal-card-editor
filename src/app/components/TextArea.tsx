import React, { useEffect, useRef, useState } from "react";

const TextArea: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    adjustHeight();
  }, [text]);

  // useEffect(() => {
  //   const handleSelectionChange = (e) => {
  //     const X = e.clientX;
  //     console.log(e);
  //     console.log("選択されたよ");
  //   };
  //   document.addEventListener("selectionchange", (e) => {
  //     const X = e.clientX;
  //     console.log(X);
  //     console.log("選択されたよ");
  //   });
  //   return () => {
  //     document.removeEventListener("selectionchange", handleSelectionChange);
  //   };
  // }, []);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const test = (e) => {
    const selectedText = document.getSelection().toString();
    //選択した文字数が0なら処理を実行しない
    if (selectedText.length === 0) {
      return;
    }
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    console.log(range);
    // console.log(getSelection());
    // console.log(selectedText);
  };

  return (
    <textarea
      ref={textareaRef}
      id="textarea"
      className="w-full min-h-[800px] p-1 border border-gray-600 resize-none overflow-hidden"
      value={text}
      onDrop={(e) => e.preventDefault()}
      onSelect={(e) => test(e)}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
    ></textarea>
  );
};

export default TextArea;
