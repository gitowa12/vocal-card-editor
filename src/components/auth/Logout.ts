import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const Logout = async () => {
  const supabase = createClient();

  // supabaseに用意されているログアウトの関数
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
    throw new Error(error.message);
  }
  // ログアウトを反映させるためにリロードさせる
  // location.reload();
};
