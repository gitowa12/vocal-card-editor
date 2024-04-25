import LoginButton from "@/components/auth/LoginButton";
import EditArea from "@/features/EditArea";
import EditArea_Home from "@/features/EditArea_Home";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between">
      <section className="mt-[90px] mb-[64px]">
        <div className=" flex flex-col justify-center items-center">
          <div className="w-[700px] mb-10 flex flex-col  justify-center items-center ">
            <img src="/Vird.svg" alt="" width="130" className="mb-6" />{" "}
            <p className="text-xl">Virdは、歌詞カード作成に特化したテキストエディタです。</p>
            <p className="text-xl">誰でも簡単に歌詞カードを作成できます。</p>
            <p className="text-xl">カラフルなアイコンやハイライトを使って</p>
            <p className="text-xl">あなただけのオリジナル歌詞カードを作りましょう!</p>
          </div>
          <div className=" w-[720px] ">
            <img src="/エディタ画面.png" alt="" className="border rounded-xl shadow-md" />
          </div>
        </div>
      </section>
      {/* <section className="relative mb-10 w-[1200px] h-[800px] flex justify-center items-center ">
        <div className="absolute w-[800px] top-[100px] left-[100px]">
          <img src="/エディタ画面.png" alt="" className="border rounded-xl shadow-md" />
        </div>

        <div className="absolute top-[250px] left-[570px] mb-5 p-10 flex flex-col rounded-2xl border shadow-md bg-white">
          <img src="/Vird.svg" alt="" width="130" className="mb-5" />{" "}
          <p className="text-xl">Virdは、歌詞カード作成に特化したテキストエディタです。</p>
          <p className="text-xl">誰でも簡単に歌詞カードを作成できます。</p>
          <p className="text-xl">
            カラフルなアイコンやハイライトなど、
            <br />
            あなただけのオリジナル歌詞カードを作りましょう。
          </p>
        </div>
      </section> */}
      {/* <section className="mb-8 w-[1200px] min-h-svh">
        <h2 className="text-6xl font-bold mb-4">Example</h2>
        <div className="">
          <img src="/ホーム用.png" alt="" />
        </div>
      </section> */}
      <section className="mb-[64px]">
        <h2 className="text-6xl font-bold mb-8 text-left">Try it</h2>
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
