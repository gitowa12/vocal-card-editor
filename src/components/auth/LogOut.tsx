import { supabase } from "@/util/supabaseClient";
import { useRouter } from "next/navigation";

import React from "react";

const LogOut = () => {
  const router = useRouter();
  // ログアウトの処理を追加
  const doLogout = async () => {
    // supabaseに用意されているログアウトの関数
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
      throw new Error(error.message);
    }
    // ログアウトを反映させるためにリロードさせる
    // router.push();
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => {
          doLogout();
        }}
      >
        ログアウト
      </button>
    </div>
  );
};

export default LogOut;
