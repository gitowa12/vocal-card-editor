import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-svh flex justify-center py-[350px]">
      <div className="">
        <h1>404 Not Found</h1>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
