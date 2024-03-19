import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">サイト名</h1>
        <nav>
          <ul className="flex space-x-4">
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
              <a href="#contact" className="hover:text-gray-300">
                お問い合わせ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
