import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { NotoSansJP, YuGothic } from "../styles/fonts";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Vird",
  description:
    "Virdは、歌詞カード作成に特化したテキストエディタです。誰でも簡単に歌詞カードを作成できます。 カラフルなアイコンやハイライトを使ってあなただけのオリジナル歌詞カードを作りましょう!!",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="">
      {/*  Google tag (gtag.js) */}
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-8BY5191S4C"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8BY5191S4C');
          `,
        }}
      />
      <body className={`min-w-[768px] bg-sky-50 text-[#333]  ${NotoSansJP.className}`}>
        <Header></Header>
        <div className="min-h-svh">{children}</div>
        <Footer></Footer>
      </body>
    </html>
  );
}
