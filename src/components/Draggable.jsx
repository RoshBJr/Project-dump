import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import deleteTask from '../code/delete-task';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  const removeTask = () => {
    deleteTask(props.setList, props.id);
  }
  return (
    <div className={`c c${props.id}`}>
    <div onClick={removeTask} className="cross" >X</div>
    <button  className='drag' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
    </div>
  );
}