"use client"

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect } from "react";
import { Chat } from "./components/Chat";

export default function Room({params}: {params: {id: string}}) {

  const {socket} = useContext(SocketContext)

  useEffect(() => {
    console.log('useEffect Room Page')

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
        <div className="md:w-[80%] m-3 w-full" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" >

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