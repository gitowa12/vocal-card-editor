const Loading = () => {
  return (
    <div className="h-svh flex justify-center p-[350px] gap-6 mt-10">
      <div className="h-10 w-10 animate-spin border-[5px] border-sky-400 rounded-full  border-t-transparent"></div>
      <p className="text-[30px] font-weight">Loading</p>
    </div>
  );
};

export default Loading;
