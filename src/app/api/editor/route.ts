// import { supabase } from "@/utils/supabaseClient";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get();
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("editorData")
      .select("*")
      .order("updated_at", { ascending: false });
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("editorData")
      .insert([{ quillContents: null, iconsData: null }])
      .select();
    console.log("成功したよ");
    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
  }
};
