"use client"

import { format } from "date-fns";
import { CameraIcon, CameraOffIcon, MicIcon, MonitorIcon, MonitorOffIcon, PhoneIcon, PhoneOffIcon, MicOff} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Footer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  
  const hoursAndMinutes = format(new Date(), "HH':'mm")

  return (
    <footer className="fixed bottom-0 bg-black py-6 w-full">
      <div className="grid grid-cols-3 justify-items-center items-center" >
        <span className="text-lg font-semibold" >{hoursAndMinutes}</span>
        
        <div className="flex gap-1" >
          {isMuted ? (
            <Button className="bg-red-500" onClick={() => setIsMuted(!isMuted)}><MicOff  className="" size={30}/></Button>
          ) : (
            <Button className="bg-transparent hover:bg-red-500" onClick={() => setIsMuted(!isMuted)} ><MicIcon  className="" size={30}/></Button>
          )}

          {isCameraOff ? (
            <Button className="bg-red-500" onClick={() => setIsCameraOff(!isCameraOff)}><CameraOffIcon  className="" size={30}/></Button>
          ) : (
            <Button className="bg-transparent hover:bg-red-500" onClick={() => setIsCameraOff(!isCameraOff)} ><CameraIcon  className="" size={30}/></Button>
          )}

          {isScreenSharing ? (
            <Button className="bg-red-500" onClick={() => setIsScreenSharing(!isScreenSharing)}><MonitorOffIcon  className="" size={30}/></Button>
          ) : (
            <Button className="bg-transparent hover:bg-red-500" onClick={() => setIsScreenSharing(!isScreenSharing)} ><MonitorIcon  className="" size={30}/></Button>
          )}
          
          <Button className="bg-primary" ><PhoneIcon  className="" size={30}/></Button>
        </div>

        <div>
          <PhoneOffIcon />
        </div>
      </div>
    </footer>
  )
}