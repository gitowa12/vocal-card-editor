import LoginButton from "@/components/auth/LoginButton";
import EditArea from "@/features/EditArea";
import EditArea_Home from "@/features/EditArea_Home";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between">
      <section className="mt-[90px] mb-[64px]">
        <div className=" flex flex-col justify-center items-center">
          <div className="w-[700px] mb-10 flex flex-col  justify-center items-center ">
            <div className="flex items-center">
              <img src="/Vird.svg" alt="" width="130" className="mb-6 mr-1" />
              <p>(β)</p>
            </div>

            <p className="text-xl">Virdは、歌詞カード作成に特化したテキストエディタです。</p>
            <p className="text-xl">誰でも簡単に歌詞カードを作成できます。</p>
            <p className="text-xl">カラフルなアイコンやハイライトを使って</p>
            <p className="text-xl">あなただけのオリジナル歌詞カードを作りましょう!</p>
            <p className="mt-2">※ベータ版です。</p>
          </div>
          <div className=" w-[720px] ">
            <img src="/エディタ画面.png" alt="" className="border rounded-xl shadow-md" />
          </div>
        </div>
      </section>

      <section className="mb-[64px]">
        <div className="flex items-center">
          <h2 className="text-6xl font-bold mb-8 text-left mr-4">Try it</h2>
          <p className="font-bold text-2xl pb-2">使ってみよう</p>
        </div>

        <div className="flex flex-col items-center ">
          <div className="">
            <EditArea_Home
              quillData={null}
              iconsData={null}
              titleData={""}
              artistData={""}
              id={""}
            ></EditArea_Home>
          </div>
        </div>
      </section>
      <section className="mb-[64px]">
        <div className="shadow w-[400px] flex flex-col border items-center  bg-white p-8 rounded-xl">
          <p className=" mb-3 font-bold">ログインしてはじめましょう</p>
          <div className="relative z-0"></div>
          <LoginButton></LoginButton>
        </div>
      </section>
    </main>
  );
}
