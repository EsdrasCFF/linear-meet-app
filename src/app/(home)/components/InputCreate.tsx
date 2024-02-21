import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export function InputCreate() {
  
  const name = useRef<HTMLInputElement>(null)
  
  return (
    <form className="flex flex-col bg-secondary p-5 rounded-b-md gap-5">

      <Input className="bg-gray-950 border-none" placeholder="Digite seu nome" ref={name} />
      <Button className="text-black" > Entrar </Button>
    
    </form>
  )
}