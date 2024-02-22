"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CreateRoomForm } from "./FormCreate"
import { JoinRoomForm } from "./FormJoin"


export function FormWrapper() {
  const [selectRoom, setSelectRoom] = useState<'join' | 'create'>('join')

  function handleSelectRoom(room: 'join' | 'create') {


    setSelectRoom(room)
  }

  return (
    <div className="w-full flex flex-col" >
      <div className="grid grid-cols-2">
        <Button 
          onClick={() => handleSelectRoom('join')}
          className= {`
            w-full rounded-none rounded-t-md text-primary
            ${selectRoom == 'join' ? 'bg-secondary hover:bg-secondary' : 'bg-black hover:bg-black' }
          `}
        >
          Ingressar
        </Button>
        
        <Button
          onClick={() => handleSelectRoom('create')} 
          className={`
            "w-full rounded-none rounded-t-md"
            ${selectRoom == 'create' ? 'bg-secondary hover:bg-secondary rounded-t-md' : 'bg-black hover:bg-black' }
          `}
        >
          Nova reunião
        </Button>
      </div>
      
      {selectRoom == 'create' ? (
        <CreateRoomForm/>
      ):(
        <JoinRoomForm />
      )}
    </div>
  )
}