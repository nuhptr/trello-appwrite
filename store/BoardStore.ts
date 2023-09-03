import { create } from 'zustand'
import { getTodosGrupedByColumn } from '@/utils/getTodosGroupedByColumn'
import { databases } from '@/appwrite'

interface BoardState {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodoInDB: (todo: Todo, columnId: TypeColumn) => void

  searchString: string
  setSearchString: (searchString: string) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  board: { columns: new Map<TypeColumn, Column>() },
  getBoard: async () => {
    const board = await getTodosGrupedByColumn()
    set({ board })
  },
  setBoardState: (board) => set({ board }),
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
}))
