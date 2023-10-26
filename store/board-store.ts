import { create } from "zustand"

import { getTodosGrupedByColumn } from "@/utils/get-todos-grouped-by-column"
import { ID, databases, storage } from "@/appwrite"
import uploadImage from "@/utils/upload-image"

interface BoardState {
   board: Board
   getBoard: () => void
   setBoardState: (board: Board) => void
   // update todo in db
   updateTodoInDB: (todo: Todo, columnId: TypeColumn) => void

   // search state
   searchString: string
   setSearchString: (searchString: string) => void

   addTask: (todo: string, columnId: TypeColumn, image?: File | null) => void
   // delete task
   deleteTask: (taskIndex: number, todoId: Todo, id: TypeColumn) => void

   // add task
   newTaskInput: string
   setNewTaskInput: (input: string) => void

   // new task type
   newTaskType: TypeColumn
   setNewTaskType: (columnId: TypeColumn) => void

   // image
   image: File | null
   setImage: (image: File | null) => void
}

// Create a store with Zustand and export it as a hook
export const useBoardStore = create<BoardState>((set, get) => ({
   board: { columns: new Map<TypeColumn, Column>() },
   getBoard: async () => {
      const board = await getTodosGrupedByColumn()
      set({ board })
   },
   setBoardState: (board) => set({ board }),

   // TODO: update todo in db
   updateTodoInDB: async (todo, columnId) => {
      await databases.updateDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
         todo.$id,
         { title: todo.title, status: columnId }
      )
   },

   // search state
   searchString: "",
   setSearchString: (searchString) => set({ searchString }),

   // TODO: add task
   addTask: async (todo: string, columnId: TypeColumn, image?: File | null) => {
      let file: Image | undefined

      if (image) {
         const fileUploaded = await uploadImage(image)
         if (fileUploaded) file = { bucketId: fileUploaded.bucketId, fileId: fileUploaded.$id }
      }

      const { $id } = await databases.createDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
         ID.unique(),
         {
            title: todo,
            status: columnId,
            // include image in the document if it exists
            ...(file && { image: JSON.stringify(file) }),
         }
      )

      set({ newTaskInput: "" })
      set((state) => {
         const newColumns = new Map(state.board.columns)

         const newTodo: Todo = {
            $id,
            $createdAt: new Date().toISOString(),
            title: todo,
            status: columnId,
            // include image in the document if it exists
            ...(file && { image: file }),
         }

         const columns = newColumns.get(columnId)

         if (!columns) newColumns.set(columnId, { id: columnId, todos: [newTodo] })
         else newColumns.get(columnId)?.todos.push(newTodo)

         return { board: { columns: newColumns } }
      })
   },

   // TODO: delete task
   deleteTask: async (taskIndex: number, todo: Todo, id: TypeColumn) => {
      const newColumns = new Map(get().board.columns)

      // Remove the todo from the newColumns map
      newColumns.get(id)?.todos.splice(taskIndex, 1)
      set({ board: { columns: newColumns } })

      if (todo.image) await storage.deleteFile(todo.image.bucketId, todo.image.fileId)

      await databases.deleteDocument(
         process.env.NEXT_PUBLIC_DATABASE_ID!,
         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
         todo.$id
      )
      console.log("deleted")
   },

   // add task
   newTaskInput: "",
   setNewTaskInput: (input: string) => set({ newTaskInput: input }),

   // new task type
   newTaskType: "todo",
   setNewTaskType: (columnId: TypeColumn) => set({ newTaskType: columnId }),

   // image
   image: null,
   setImage: (image: File | null) => set({ image }),
}))
