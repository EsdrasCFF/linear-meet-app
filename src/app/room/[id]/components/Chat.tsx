import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocketContext } from "@/contexts/SocketContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonalIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChatMessageSchema = z.object({
  message: z.string().min(1, {message: 'Sua mensagem precisa ter ao menos 1 caracter!'})
})

type ChatMessageFormData = z.infer<typeof ChatMessageSchema>

export function Chat({roomId}:{roomId: string}) {
  
  const {socket} = useContext(SocketContext)

  const {register, handleSubmit, setValue, formState: {isSubmitting, errors}} = useForm<ChatMessageFormData>({
    resolver: zodResolver(ChatMessageSchema)
  })

  function handleSendMessage(data: ChatMessageFormData) {
    const currentMessage = data.message

    console.log( 'currentMessage:', currentMessage)

    const sendMessageToServer = {
      message: currentMessage,
      username: 'Esdras Castro',
      roomId,
      time: new Date().toLocaleTimeString()
    }
    

    socket?.emit('chat', sendMessageToServer)

    setValue('message', '')
  }

  useEffect(() => {
    console.log('Use effect atualizado')

    socket?.on('chat', (data) => {
      console.log('message:',data)
    })

  }, [socket])

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
          
          <form action="" className="absolute bottom-2 w-full" onSubmit={handleSubmit(handleSendMessage)} >
            <div className="flex relative pr-1" >
              <Input type="text" {...register('message')} className="bg-gray-950 border-none"/>
              <Button type="submit" size='icon' className="absolute right-1 top-0 bg-transparent" disabled={isSubmitting} >
                <SendHorizonalIcon />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}