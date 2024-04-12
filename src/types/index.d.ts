

export type UUID = string; // UUIDをstring型として定義

export type EditorData = { // 型名は慣習的に大文字から始めることが多いです
  id: UUID;
  updated_at: Date | string;
  created_at: Date ; // created_adからcreated_atに修正
  quillContents: string; // JavaScriptの型名は小文字を使います
  iconsData: string;
  title: string;
  artist: string;
}