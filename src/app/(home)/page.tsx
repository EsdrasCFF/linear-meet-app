import { Header } from "@/components/Header";
import { Container } from '@/components/Container'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" >
      <Header />
      <div className="max-w-[580px] mx-auto w-full h-full flex flex-1 items-center justify-center" >
        
        <div className="w-[400px] flex flex-col" >
          <div className="flex">
            <Button className="w-full bg-secondary rounded-none rounded-t-md text-primary" >Ingressar</Button>
            <Button className="w-full bg-black rounded-none rounded-t-md" >Nova reunião</Button>
          </div>
          
          <form className="flex flex-col bg-secondary p-5 rounded-b-md gap-5">

            <Input className="bg-gray-950 border-none" />
            <Input className="bg-gray-950 border-none" />
            <Button className="text-black" > Entrar </Button>
          
          </form>
        </div>
      </div>
    </main>
  );
}
