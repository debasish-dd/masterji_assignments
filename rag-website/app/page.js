"use client";
import Image from "next/image";
import FileUpload from "./components/file-upload";

export default function Home() {
  return (
   <div className="flex gap-3 w-screen min-h-screen">
     <div className=" lg:w-[35vw] w-[45vw] border-r-2">
      <FileUpload/>
     </div>
     <div className="lg:w-[65vw] w-[55vw]">
    2
     </div>
   </div>
  );
}
