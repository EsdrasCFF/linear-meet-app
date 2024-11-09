'use client'

import { SocketContext } from '@/contexts/socket-context'
import { Chat } from '@/features/room/components/chat'
import { Footer } from '@/features/room/components/footer'
import { useContext, useEffect, useRef } from 'react'

interface IAnswer {
  sender: string
  description: RTCSessionDescription
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext)

  const localStream = useRef<HTMLVideoElement>(null)
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})

  const initCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    if (localStream.current) localStream.current.srcObject = video
  }

  const createPeerConnection = async (socketId: string, createOffer: boolean) => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }

    const peer = new RTCPeerConnection(config)
    peerConnections.current[socketId] = peer

    if (createOffer) {
      console.log('Creiando uma oferta')
      const peerConnection = peerConnections.current[socketId]
      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      socket?.emit('sdp', {
        to: socketId,
        sender: socket?.id,
        description: peerConnection.localDescription,
      })
    }
  }

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('Conectado')
      socket.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id,
      })

      await initCamera()
    })

    socket?.on('new user', (data: any) => {
      console.log('Novo usuário tentando conectar', data)
      createPeerConnection(data.socketId, false)
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
      })
    })

    socket?.on('newUserStart', (data: any) => {
      console.log('Usuário conectado na sala:', data)
      createPeerConnection(data.sender, true)
    })

    socket?.on('sdp', async (data: IAnswer) => {
      const peerConnection = peerConnections.current[data.sender]

      if (data.description.type === 'offer') {
        await peerConnection.setRemoteDescription(data.description)
        console.log('Criando resposta')
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

        socket.emit('sdp', {
          to: data.sender,
          sender: socket.id,
          description: peerConnection.localDescription,
        })
      } else if (data.description.type === 'answer') {
        console.log('Ouvindo oferta')
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.description))
      }
    })
  }, [socket])

  return (
    <div className="flex h-[calc(100%-4rem)] w-full flex-col justify-between gap-5 p-5">
      <div className="flex h-[calc(100vh-188px)] w-full gap-5">
        <div className="flex h-full w-full flex-col gap-5 overflow-y-auto sm:grid sm:w-[60%] sm:grid-cols-1 md:w-[80%] md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="mirror-mode h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
        </div>
        <div className="hidden h-full w-[20%] sm:flex sm:w-[40%] md:w-[20%]">
          <Chat roomId={params.id} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
