import React, { useEffect, useState } from 'react';
import {useDroppable} from '@dnd-kit/core';

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
        props.taskList &&
        props.taskList.map(task => {
          if(task.dropid == props.id) return task.dom;
          return;
        })
      }
    </div>
  );
}