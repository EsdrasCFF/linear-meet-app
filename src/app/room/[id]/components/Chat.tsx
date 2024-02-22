import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocketContext } from "@/contexts/SocketContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { SendHorizonalIcon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChatMessageSchema = z.object({
  message: z.string().min(1, {message: 'Sua mensagem precisa ter ao menos 1 caracter!'})
})

type ChatMessageFormData = z.infer<typeof ChatMessageSchema>

interface IChatMessage {
  message: string;
  username: string;
  roomId: string;
  time: string;
}


export function Chat({roomId}:{roomId: string}) {
  
  const [chat, setChat ] = useState<IChatMessage[]>([])

  const {socket} = useContext(SocketContext)
  
  
  const {register, handleSubmit, setValue, formState: {isSubmitting, errors}} = useForm<ChatMessageFormData>({
    resolver: zodResolver(ChatMessageSchema)
  })
  
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  
  function scrollToBottom() {
  
    chatContainerRef.current && (chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight);
  }

  function handleSendMessage(data: ChatMessageFormData) {
    const currentMessage = data.message

    const sendMessageToServer = {
      message: currentMessage,
      username: 'Esdras Castro',
      roomId,
      time: new Date().toLocaleTimeString()
    }
    

    socket?.emit('chat', sendMessageToServer)

    setChat(prevState => [...prevState, sendMessageToServer])

    setValue('message', '')
  }

  
  

  useEffect(() => {
    socket?.on('chat', (data: IChatMessage) => {
      console.log('message:',data)

      setChat((prevState) => [...prevState, data])

      scrollToBottom()
      console.log(chat)
    })

  }, [socket, chat])

  return (
    <div className=" bg-secondary p-2 pt-2 rounded-md mt-3 flex flex-col w-[20%] h-full">
      <div className="h-full w-full flex flex-col gap-2" >
        <div 
          ref={chatContainerRef}
          className=" flex flex-col h-full gap-2 rounded-md p-2 overflow-y-auto [&::-webkit-scrollbar]:hidden" 
        >
          
          {chat.length < 1 ? (
            <div>
              <div className="flex items-center justify-between text-pink-400 gap-2 text-[12px]" >
                <span>Chat Aberto:</span>
                <span>{format(new Date(), "HH':'mm")}</span>
              </div>
            </div>
          ) : (

            chat.map((chat, index) => (
              <div key={index} className="bg-gray-950 rounded-md p-2">
                <div className="flex items-center justify-between text-pink-400 gap-2 text-[12px]" >
                  <span>Esdras Castro</span>
                  <span>09:15</span>
                </div>
                
                <div className="mt-2 text-[12px]" >
                  <span>{chat.message}</span>
                </div>
              </div>
            )))
          }
          
          
        </div>
        <form className=" w-full" onSubmit={handleSubmit(handleSendMessage)} >
          <div className="flex w-full bg-gray-950 hover:outline rounded-md" >
            <Input type="text" {...register('message')} className="bg-gray-950 border-none focus:outline-transparent"/>
            <Button type="submit" size='icon' className="bg-transparent" disabled={isSubmitting} >
              <SendHorizonalIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}