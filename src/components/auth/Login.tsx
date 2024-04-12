"use client";

import { supabase } from "@/util/supabaseClient";
import React, { useEffect, useState } from "react";

const Login = () => {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) console.error("Login error", error.message);
    else console.log("User logged in", data);
  };

  return (
    <div>
      <button
        className="py-1 px-3 text-xs bg-white border border-neutral-200 rounded-full hover:bg-sky-50"
        onClick={handleGoogleLogin}
      >
        Login with Google
      </button>
      <div></div>
    </div>
  );
};

export default Login;
