import { create } from 'zustand';
import { getTodosGrupedByColumn } from '@/utils/getTodosGroupedByColumn';

interface BoardState {
  board: Board;
  getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGrupedByColumn();
    set({ board });
  },
}));
