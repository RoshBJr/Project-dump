import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  function removeTask() {
    props.setTaskList(props.taskList.filter(item => item.id != props.id));
    props.setLastDragged(
      [...new Set(props.lastDragged.filter(item => item != props.id))]
    );
    
  }
  return (
    <div className="c">
    <div onClick={() => removeTask()} className="cross" >X</div>
    <button  className='drag' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      
      {props.children}
    </button>
    </div>
  );
}