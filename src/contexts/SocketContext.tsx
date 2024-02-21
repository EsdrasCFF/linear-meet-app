'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext({} as SocketContextProps)

export function SocketProvider({children}: {children: ReactNode}) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(()=> {
    console.log('Context Funcionando!!!')
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/streams`, {
      transports: ['websocket']
    })

    console.log(newSocket)

    setSocket(newSocket)

  }, [])

  return (
    <SocketContext.Provider value={{socket}} >
      {children}
    </SocketContext.Provider>
  )
}