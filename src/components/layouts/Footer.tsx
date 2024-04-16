import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-white p-4 border h-[100px]">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0 text-center md:text-left">
          <p className="text-xl font-semibold">© 2024 サイト名. All rights reserved.</p>
        </div>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-0 md:space-x-4">
            <li>
              <a href="#home" className="hover:text-gray-300">
                ホーム
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">
                私たちについて
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-300">
                サービス
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                お問い合わせ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
