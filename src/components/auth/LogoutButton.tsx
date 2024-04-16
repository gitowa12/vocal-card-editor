import { createClient } from "@/utils/supabase/client";
// import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

import React from "react";
import { Logout } from "./Logout";

const LogOutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await Logout();
    router.push(`/`);
    router.refresh();
  };
  return (
    <div>
      <button className="p-3" onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  );
};

export default LogOutButton;
