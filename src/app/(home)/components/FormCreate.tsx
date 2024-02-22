import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateCharacters } from "@/utils/generateCharacters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateRoomFormSchema = z.object({
  username: z.string().min(3, {message: 'Digite o seu nome com pelo menos 3 caracteres'})
})

type CreateRoomFormData = z.infer<typeof CreateRoomFormSchema>

export function CreateRoomForm() {
  const router = useRouter()

  const { handleSubmit, register, setValue, formState:{isSubmitting, errors} } = useForm<CreateRoomFormData>({
    resolver: zodResolver(CreateRoomFormSchema)
  })
  
  function handleCreateRoomFormSubmit(data: CreateRoomFormData) {
    sessionStorage.setItem('@linear-meet:username', data.username)
  
    const roomId = generateCharacters()

    window.location.href = `/room/${roomId}`
    // router.push(`room/${roomId}`)
  }


  return (
    <form className="flex flex-col bg-secondary p-5 rounded-b-md gap-5" onSubmit={handleSubmit(handleCreateRoomFormSubmit)}>
      <div>

      <Input className="bg-gray-950 border-none" placeholder="Digite seu nome" {...register('username')} />
        {errors.username?.message && (
          <p className="text-[10px] text-red-500 mt-1 px-1">{errors.username.message}</p>
        )}
      </div>
      <Button className="text-black" disabled={!!errors.username?.message || isSubmitting}> Entrar </Button>
    
    </form>
  )
}