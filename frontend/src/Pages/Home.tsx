import { AppBar } from "../Components/AppBar";
import  { HomeText } from "../Components/HomeText";
import { useState } from "react";



export const Home = () => {
   const [isMobile] = useState(window.innerWidth < 900);
  return (
    <div className="border-black border-2 ">
      <AppBar home/>
    <div className="grid grid-cols-1 lg:grid-cols-12 border-black lg:border-b overflow-hidden">
      <div className="col-span-8">
     <HomeText />
     </div>
     <div className="col-span-4 mt-4 pl-15  hidden lg:block">
      <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="Description" className="w-md " />
     </div>
    </div>
    { !isMobile && <footer className=" text-xs text-zinc-600 font-medium flex w-full justify-center h-full items-center p-6">
        <div className="p-2">Help</div>
        <div className="p-2">About</div>
        <div className="p-2">Status</div>
        <div className="p-2">Careers</div>
        <div className="p-2">Press</div>
        <div className="p-2">Blog</div>
        <div className="p-2">Privacy</div>
        <div className="p-2">Rules</div>
        <div className="p-2">Terms</div>
        <div className="p-2">Text to speech</div>
      </footer>}
      { isMobile &&<footer className=" mt-15 bg-black text-white flex h-full items-center p-6 md:p-10">
        <div className="p-2">Help</div>
        <div className="p-2">About</div>
        <div className="p-2">Privacy</div>
        <div className="p-2">Terms</div>
      </footer>}
    </div>
  );
};
