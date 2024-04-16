import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white  p-4 z-50 border">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          <Link href="/" className="">
            <img src="/Vird.svg" width="70" alt={""}></img>
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <a href="/" className="hover:text-gray-300">
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
