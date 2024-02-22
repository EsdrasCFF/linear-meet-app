"use client"

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";
import { Chat } from "./components/Chat";
import { initCamera } from "@/utils/initCamera";

export default function Room({params}: {params: {id: string}}) {

  const {socket} = useContext(SocketContext)

  const localStream = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('Conectado:')

      socket?.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id
      })

      const video = await initCamera()
      localStream.current!.srcObject = video
    })
  }, [socket, params.id])

  return (
    <div className="h-screen" >
      <Header />
      
      <div className="flex h-[77%] container" >
        <div className="w-[80%] m-3 h-full" >
          <div className="grid grid-cols-2 gap-5 h-full w-full" >

            <div className="relative bg-gray-950 w-full rounded-md h-full">
              <video className="h-full w-full" autoPlay ref={localStream}></video>
              <span className="absolute bottom-1 left-1" >Esdras Castro</span>
            </div>
            <div className="relative bg-gray-950 w-full rounded-md h-full">
              <video className="h-full w-full" autoPlay playsInline />
              <span className="absolute bottom-1 left-1" >Esdras Castro</span>
            </div>
            <div className="relative bg-gray-950 w-full rounded-md h-full">
              <video className="h-full w-full" ></video>
              <span className="absolute bottom-1 left-1" >Esdras Castro</span>
            </div>
            <div className="relative bg-gray-950 w-full rounded-md h-full">
              <video className="h-full w-full" ></video>
              <span className="absolute bottom-1 left-1" >Esdras Castro</span>
            </div>
          </div>
        </div>
        <Chat roomId={params.id} />
      </div>
    
      
      <Footer/>
    </div>
  )
}