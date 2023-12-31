import { useEffect, useState } from "react"
import { XCircleIcon } from "@heroicons/react/24/solid"
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd"

import { useBoardStore } from "@/store/board-store"
import getUrl from "@/utils/get-url"
import Image from "next/image"

interface TodoProps {
   todo: Todo
   index: number
   id: TypeColumn
   innerRef: (element: HTMLElement | null) => void
   draggableProps: DraggableProvidedDraggableProps
   dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

export default function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: TodoProps) {
   const [deleteTask] = useBoardStore((state) => [state.deleteTask])
   const [imageURL, setImageURL] = useState<string | null>(null)

   useEffect(() => {
      if (todo.image) {
         const fetchImage = async () => {
            const url = await getUrl(todo.image!)
            if (url) setImageURL(url.toString())
         }

         fetchImage()
      }
   }, [todo])

   return (
      <div
         className="bg-white rounded-md space-y-2 drop-shadow-md"
         {...draggableProps}
         {...dragHandleProps}
         ref={innerRef}>
         <div className="flex justify-between items-center p-5">
            <p>{todo.title}</p>
            <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
               <XCircleIcon className="ml-5 h-8 w-8" />
            </button>
         </div>

         {/* Add Image Here */}
         {imageURL && (
            <div className="h-full w-full rounded-b-md">
               <Image
                  src={imageURL}
                  alt="Task Image"
                  width={400}
                  height={200}
                  className="w-full object-contain rounded-b-md"
               />
            </div>
         )}
      </div>
   )
}
