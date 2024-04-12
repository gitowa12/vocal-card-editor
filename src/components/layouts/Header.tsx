import { supabase } from "@/util/supabaseClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Login from "../auth/Login";
import LoginForm from "../auth/LoginForm";

const Header = () => {
  return (
    <header className="bg-neutral-500 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">サイト名</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <a href="#home" className="hover:text-gray-300">
                ホーム
              </a>
            </li>
            <li>
              <Link href="/list" className="">
                <p>一覧</p>
              </Link>
            </li>
            <li>
              <LoginForm></LoginForm>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
