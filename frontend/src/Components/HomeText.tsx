import { Link } from "react-router-dom";

export const HomeText = () => {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className=" text-left lg:ml-40 pt-40 p-7 lg:pt-0 lg:p-0 lg:pb-0 ">
        <div className="text-8xl sm:text-7xl  font-medium font-serif text-zinc-800">
          Human
        </div>

        <div className="text-8xl sm:text-7xl font-medium font-serif text-zinc-800">
          stories & ideas
        </div>
        <div className="text-xl font-medium text-zinc-800 pt-10">
          A place to read, write, and deepen your understanding
        </div>
        <button className="p-3 lg:bg-zinc-800 bg-[#1A9817] font-medium text-white  text-xl w-45 rounded-full mt-15 hover:bg-black">
          <Link to={'/signin'}>Start reading</Link>
        </button>
      </div>
      
    </div>
  );
};
