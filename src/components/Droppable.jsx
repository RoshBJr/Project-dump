import React, { useEffect, useState } from 'react';
import {useDroppable} from '@dnd-kit/core';
import { droppableTasks } from '../code/droppable';

export function Droppable(props) {
  const [drop, setDrop] = useState([]);


  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  return (
    <div className='drop' ref={setNodeRef} style={style}>
      <h1>{props.id}</h1>
      {
        // render draggables tasks in droppable
        droppableTasks(props.taskList, props.id)
      }
    </div>
  );
}