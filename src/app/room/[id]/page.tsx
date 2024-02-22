"use client"

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect } from "react";
import { Chat } from "./components/Chat";

export default function Room({params}: {params: {id: string}}) {

  const {socket} = useContext(SocketContext)

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('Conectado:')

      socket?.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id
      })
    })
  }, [socket, params.id])

  return (
    <div className="h-screen" >
      <Header />
      
      <div className="flex h-[77%] container" >
        <div className="w-[80%] m-3 h-full" >
          <div className="grid grid-cols-2 gap-5 h-full w-full" >

            <div className="relative bg-gray-950 w-full rounded-md h-full">
              <video className="h-full w-full" ></video>
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