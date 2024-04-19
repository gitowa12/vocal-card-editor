import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <img src="/Vird.svg" className="h-8 me-3" alt="FlowBite Logo" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                About
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/coming-soon" className="hover:underline">
                    このサイトについて
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/coming-soon" className="hover:underline">
                    お知らせ
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className="hover:underline">
                    リリースノート
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Guide
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/coming-soon" className="hover:underline ">
                    使い方
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className="hover:underline">
                    よくある質問
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/coming-soon" className="hover:underline">
                    利用規約
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/coming-soon" className="hover:underline">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/towa97674795586" className="hover:underline">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Vird
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
