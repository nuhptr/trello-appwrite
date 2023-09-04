import { create } from 'zustand'
import { getTodosGrupedByColumn } from '@/utils/getTodosGroupedByColumn'
import { databases, storage } from '@/appwrite'

interface BoardState {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  // update todo in db
  updateTodoInDB: (todo: Todo, columnId: TypeColumn) => void

  // search state
  searchString: string
  setSearchString: (searchString: string) => void

  // delete task
  deleteTask: (
    taskIndex: number,
    todoId: Todo,
    id: TypeColumn
  ) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: { columns: new Map<TypeColumn, Column>() },
  getBoard: async () => {
    const board = await getTodosGrupedByColumn()
    set({ board })
  },
  setBoardState: (board) => set({ board }),
  // update todo in db
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    )
  },

  // search state
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),

  // delete task
  deleteTask: async (
    taskIndex: number,
    todo: Todo,
    id: TypeColumn
  ) => {
    const newColumns = new Map(get().board.columns)

    /**
     * Remove the todo from the newColumns map
     */
    newColumns.get(id)?.todos.splice(taskIndex, 1)
    set({ board: { columns: newColumns } })

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    )
  },
}))
