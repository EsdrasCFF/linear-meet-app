import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const JoinRoomFormSchema = z.object({
  username: z.string().min(3, {message: 'Informe o seu nome com pelo menos 3 caracteres!'}),
  id: z.string().min(12,{message: 'Informe corretamene o ID da Sessão - Ex: "abcd-1234-abcd"'})
})

type JoinRoomFormData = z.infer<typeof JoinRoomFormSchema>

export function JoinRoomForm() {
  
  const router = useRouter()

  const {handleSubmit, register, setValue, formState: {errors, isSubmitting}} = useForm<JoinRoomFormData>({
    resolver: zodResolver(JoinRoomFormSchema)
  })


  function handleJoinRoomFormSubmit(data: JoinRoomFormData) {
    const {id: roomId, username} = data
    
    sessionStorage.setItem('@linear-meet:username', username)
    window.location.href = `/room/${roomId}`
    // router.push()
    
  }

  return (
    <form className="flex flex-col bg-secondary p-5 rounded-b-md gap-5" onSubmit={handleSubmit(handleJoinRoomFormSubmit)}>
      <div>
        <Input className="bg-gray-950 border-none " placeholder="Digite seu nome" {...register('username')}  />
        {errors.username?.message && (
          <p className="mt-1 px-1 text-[10px] text-red-400" >{errors.username.message}</p>
        )}
      </div>    
      
      <div>
        <Input className="bg-gray-950 border-none" placeholder="Digite o ID da reunião" {...register('id')} />
        {errors.id?.message && (
          <p className="mt-1 px-1 text-[10px] text-red-400" >{errors.id.message}</p>
        )}
      </div>

      <Button className="text-black" disabled={!!errors.id?.message || !!errors.username?.message || isSubmitting}> Entrar </Button>
    </form>
  )
}