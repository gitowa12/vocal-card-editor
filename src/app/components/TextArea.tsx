import React, { useEffect, useRef, useState } from "react";

const TextArea: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      ref={textareaRef}
      id="textarea"
      className="w-full min-h-[800px] p-1 border border-gray-600 resize-none overflow-hidden"
      value={text}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
    ></textarea>
  );
};

export default TextArea;
