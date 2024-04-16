import LoginButton from "@/components/auth/LoginButton";
import EditArea from "@/features/EditArea";
import EditArea_Home from "@/features/EditArea_Home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mb-8 w-[1200px] min-h-svh">
        <div className="mb-5">
          <h1 className="text-5xl font-bold">Vocalcard Editor</h1>
        </div>
        <div className="">
          <img src="/ホーム用.png" alt="" />
        </div>
      </section>
      <section className="mb-8 ">
        <p className="text-[50px] font-extrabold mb-5">Try it</p>
        <div className="mb-5">
          <EditArea_Home
            quillData={null}
            iconsData={null}
            titleData={null}
            artistData={null}
            id={null}
          ></EditArea_Home>
        </div>
      </section>
      <div className="w-[400px] flex flex-col border items-center  bg-white  py-10 rounded-lg">
        <p className=" mb-3 font-bold">ログインして保存する</p>
        <div className="relative z-0"></div>
        <LoginButton></LoginButton>
        <div>
          {/* <Login></Login> */}
          {/* <LogOut></LogOut> */}
        </div>
        {/* <div className="mb-3">
            <CreateNewButton></CreateNewButton>
          </div> */}
        {/* <Link
            href="/list"
            className=" text-xl  border-2 py-2 px-6 border-neutral-400 rounded-lg bg-white"
          >
            List
          </Link> */}
      </div>
    </main>
  );
}
