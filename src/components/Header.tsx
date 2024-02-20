import { CameraIcon } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className=" bg-gray-1000" >
      <div className="container flex justify-between items-center p-5" >
        <div className="flex gap-2 items-center" >
          <CameraIcon size={25} className="text-primary" /> <span className="text-white" >Talk to me</span> 
        </div>

        <Image src='/logo.png' alt="Logo linear meet" width={40} height={40}/>
      </div>
    </header>
  )
}