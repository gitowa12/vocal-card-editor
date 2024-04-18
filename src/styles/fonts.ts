import { Inter, Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] }); //フォント設定

export const NotoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const YuGothic = Zen_Kaku_Gothic_New({ subsets: ["latin"], weight: ["400"] });
