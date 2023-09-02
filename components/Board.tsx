'use client';

import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useBoardStore } from '@/store/BoardStore';

function Board() {
  const getBoard = useBoardStore((state) => state.getBoard);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <h1>Hello</h1>
    // <DragDropContext>
    //   <Droppable
    //     droppableId='board'
    //     direction='horizontal'
    //     type='column'>
    //     {(provided) => <div>{/* Rendering all the column */}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Board;
