import CreateNewButton from "@/features/CreateNewButton";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <div>
          <CreateNewButton></CreateNewButton>
        </div>
        <div>
          <Link href="/editor" className=" text-2xl font-semibold mr-3">
            Editor{" "}
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Find in-depth information about Next.js features and API.
            </p>
          </Link>
          <Link href="/list" className=" text-2xl font-semibold">
            List{" "}
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Find in-depth information about Next.js features and API.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
