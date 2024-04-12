"use client";

import User from "@/components/User";
import LogOut from "@/components/auth/LogOut";
import Login from "@/components/auth/Login";

import CreateNewButton from "@/features/CreateNewButton";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [session, setSession] = useState(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <div className="flex flex-col items-center ">
          <div>
            {/* <Login></Login> */}
            {/* <LogOut></LogOut> */}
          </div>
          <div className="mb-3">
            <CreateNewButton></CreateNewButton>
          </div>

          <Link
            href="/list"
            className=" text-xl  border-2 py-2 px-6 border-neutral-400 rounded-lg bg-white"
          >
            List
          </Link>
        </div>
      </div>
    </main>
  );
}
