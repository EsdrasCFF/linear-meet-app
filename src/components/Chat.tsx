import { SendHorizonalIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Chat() {
  return (
    <div className=" bg-secondary px-4 pt-4 w-[20%] rounded-md m-3 hidden md:flex" >
      <div className="relative h-full" >
        <div className="bg-gray-950 rounded-md p-2" >
          <div className="flex items-center text-pink-400 space-x-2" >
            <span>Esdras Castro</span>
            <span>09:15</span>
          </div>
          
          <div className="mt-5 text-sm" >
            <span>text</span>
          </div>
          
          <form action="" className="absolute bottom-2 w-full" >
            <div className="flex relative pr-1" >
              <Input type="text" name="" id="" className="bg-gray-950 border-none"/>
              <SendHorizonalIcon className="absolute right-3 top-2 hover: cursor-pointer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}