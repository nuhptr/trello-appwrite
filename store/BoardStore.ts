import { create } from 'zustand'
import { getTodosGrupedByColumn } from '@/utils/getTodosGroupedByColumn'

interface BoardState {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  board: { columns: new Map<TypeColumn, Column>() },
  getBoard: async () => {
    const board = await getTodosGrupedByColumn()
    set({ board })
  },
  setBoardState: (board) => set({ board }),
}))
