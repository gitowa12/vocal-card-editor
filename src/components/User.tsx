"use client";

import { supabase } from "@/util/supabaseClient";
import React, { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);

  const hoge = async () => {
    const loggedInUserId = "bbe8be78-0280-493f-b034-e58469801242";
    try {
      const data = await supabase.auth.getUser();
      console.log(data);
      setUser(data);
    } catch (Error) {
      console.log(Error);
    }
    // const loggedInUserId = "bbe8be78-0280-493f-b034-e58469801242";
    // try {
    //   const { data, error } = await supabase
    //     .from("users")
    //     .select("user_id, name")
    //     .eq("user_id", loggedInUserId);
    //   if (error) throw Error;
    //   console.log(data);
    //   setUser(data);
    // } catch (Error) {
    //   console.log(Error);
    // }
  };
  hoge();

  useEffect(() => {}, []);

  return <div>Hello{user ? user : "none"}</div>;
};

export default User;
