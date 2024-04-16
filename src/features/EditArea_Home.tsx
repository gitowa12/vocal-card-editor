"use client";

import React, { createElement, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import { useParams, useRouter } from "next/navigation";
import { ImageInfo } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { Icons } from "./IconList/Icons";

// Quillエディタをクライアントサイドでのみ読み込む
const QuillEditor = dynamic(() => import("./QuillEditor/QuillEditor"), {
  ssr: false,
});

// const editEditor = async (id: string | string[], body: string) => {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const res = await fetch(`${API_URL}/api/editor/${id}/`, {
//     method: "PUT",
//     body: body,
//     cache: "no-store",
//   });

//   return res.json();
// };

// const deleteEditor = async (id: string | string[]) => {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const res = await fetch(`${API_URL}/api/editor/${id}/`, {
//     method: "DELETE",
//     cache: "no-store",
//   });
//   return res.json();
// };

const EditArea_Home = ({ id, quillData, iconsData, titleData, artistData }) => {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const iconsAreaRef = useRef<HTMLDivElement | null>(null);
  const parentNodeRef = useRef<HTMLDivElement | null>(null);
  const deleteBoxRef = useRef<HTMLDivElement | null>(null);
  const quillParentRef = useRef<HTMLDivElement | null>(null);
  const [quillContents, setQuillContents] = useState<any | null>(quillData || null);
  const [images, setImages] = useState<ImageInfo[]>(iconsData || []);
  const [title, setTitle] = useState<string>(titleData);
  const [artist, setArtist] = useState<string>(artistData);
  const [currentUserId, setcurrentUserId] = useState("");
  const [jwt, setJwt] = useState("");

  //MutationObserverを使って textAreaの高さを監視して、iconsAreaの高さもtextAreaに同期させる
  const config = {
    childList: true, //「子ノード（テキストノードも含む）」の変化
    attributes: true, //「属性」の変化
    characterData: true, //「テキストノード」の変化
    subtree: true,
  };

  useEffect(() => {
    //アイコンサイズの一括変更
    // setImages(
    //   images.map((image) => {
    //     return { ...image, className: "size-6" };
    //   })
    // );

    setQuillContents(quillData);
    // 現在ログインしているユーザーを取得する処理
    // const getCurrentUser = async () => {
    //   // ログインのセッションを取得する処理
    //   const { data } = await supabase.auth.getSession();
    //   // セッションがあるときだけ現在ログインしているユーザーを取得する
    //   if (data.session !== null) {
    //     // supabaseに用意されている現在ログインしているユーザーを取得する関数
    //     console.log(data.session);
    //     setJwt(data.session);

    //     const {
    //       data: { user },
    //     } = await supabase.auth.getUser();
    //     // currentUserにユーザーのメールアドレスを格納
    //     console.log("user", user);
    //     setcurrentUserId(user.id);
    //   }
    // };
    // getCurrentUser();

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  //アイコンドロップ時の処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const firstTime = e.dataTransfer.getData("firstTime");
    const imageId = e.dataTransfer.getData("imageId");
    const name = e.dataTransfer.getData("name");
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
          name: name,
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
    setQuillContents(newValue);
    // setQuillContents(obj);
  };

  //保存apiを実行
  const handleSave = async () => {
    const id = params.id;

    try {
      const { data, error } = await supabase
        .from("editorData")
        .update({
          quillContents: JSON.stringify(quillContents),
          iconsData: JSON.stringify(images),
          title: title,
          artist: artist,
        })
        .eq("id", id)
        .select();

      console.log("Success", data);
    } catch (error) {
      console.error("Error", error);
    }

    router.push(`/list`);
    router.refresh();
  };
  // //保存apiを実行
  // const handleSave = async () => {
  //   const id = params.id;

  //   const body = JSON.stringify({
  //     quillData: quillContents,
  //     icons: images,
  //     title: title,
  //     artist: artist,
  //   });

  //   const res = await editEditor(id, body);
  //   console.log(res);
  //   router.push(`/list`);
  // };

  const handleDelete = async () => {
    const id = params.id;
    try {
      const { error, status } = await supabase.from("editorData").delete().eq("id", id);
      console.log("Success");
      router.push(`/list`);
      router.refresh();
    } catch (error) {
      console.error("Error", error);
    }
  };
  // const handleDelete = async () => {
  //   const id = params.id;
  //   await deleteEditor(id);
  //   router.push(`/list`);
  // };

  return (
    <div className="">
      <div className="w-[1200px] flex justify-between">
        <div ref={parentNodeRef} className="w-[800px]   relative min-h-[700px] mr-4">
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

          <div
            ref={quillParentRef}
            className=" rounded-lg border z-10 absolute bg-white w-[800px] "
          >
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
        <div className="w-[350px] sticky top-5">
          <SideBar></SideBar>
        </div>
      </div>
    </div>
  );
};

export default EditArea_Home;
