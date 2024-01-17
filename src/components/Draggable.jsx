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
    // console.log(props.id);
    console.log(props.taskList);
    props.setTaskList(props.taskList.filter(item => item.id != props.id));
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