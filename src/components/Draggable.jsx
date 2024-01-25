import React, { useEffect } from 'react';
import {useDraggable} from '@dnd-kit/core';
import BasicCard from './BasicCard';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  
  return (
    <div className={`c`} ref={setNodeRef}
    style={style}
    {...listeners} 
    {...attributes}>
    <BasicCard
      taskName={props.taskName}
      dropid={props.container}
      taskUrgency={props.taskUrgency}
      setTaskList={props.setTaskList}
      dragid={props.id}
      taskList={props.taskList}
      dropids={props.dropids}
      urgOptions={props.urgOptions}
    />
    </div>
  );
}