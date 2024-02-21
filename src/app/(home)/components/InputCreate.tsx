import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputCreate() {
  return (
    <form className="flex flex-col bg-secondary p-5 rounded-b-md gap-5">

      <Input className="bg-gray-950 border-none" />
      <Button className="text-black" > Entrar </Button>
    
    </form>
  )
}