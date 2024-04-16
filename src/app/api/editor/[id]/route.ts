import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const id = req.url.split("/editor/")[1];

  try {
    const { data, error } = await supabase.from("editorData").select("*").eq("id", id).single();
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const id = req.url.split("/editor/")[1];

  const body = await req.json();
  console.log("body", body);

  const quillData = JSON.stringify(body.quillData);
  // console.log("quillData", quillData);
  const iconsData = JSON.stringify(body.icons);
  const userId = body.userId;
  const title = body.title;
  const artist = body.artist;

  try {
    const { data, error } = await supabase
      .from("editorData")
      .update({
        // 'user_id': userId,
        quillContents: quillData,
        iconsData: iconsData,
        title: title,
        artist: artist,
      })
      .eq("id", id)
      .select();

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const id = req.url.split("/editor/")[1];

  try {
    const { data, error } = await supabase.from("editorData").delete().eq("id", id);
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
  }
};
