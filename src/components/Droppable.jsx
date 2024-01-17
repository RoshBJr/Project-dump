import React, { useEffect, useState } from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  let lsDragIds = localStorage.getItem(`${props.id}`);
  const [dragIds, setDragIds] = useState(
    lsDragIds ? JSON.parse(lsDragIds): []
  );
  useEffect(() => {
    if(props.parent === null) return;

    if(dragIds.includes(props.parent[1].id) && 
        props.parent[0].id !== props.id) {
          setDragIds(
            dragIds.filter( item => item !== props.parent[1].id)
          )
    }

    if(props.parent[0].id !== props.id) return;
    setDragIds([...dragIds, props.parent[1].id]);

  }, [props.parent]);

  useEffect(() => {
    localStorage.setItem(`${props.id}`, JSON.stringify(dragIds));
  }, [dragIds]);

  useEffect(() => {
    if(props.parent === null && props.lastDragged.length === 0) {
      return setDragIds(props.lastDragged);
    }
    if(props.parent === null && props.lastDragged.length !== 0 
      && dragIds.length !== 0) {
        return setDragIds(
          dragIds.filter(item => props.lastDragged.includes(item))
        );
    }
  }, [props.lastDragged])

  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: {
      draggable: dragIds,
    },
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  return (
    <div className='drop' ref={setNodeRef} style={style}>
      <h1>{props.id}</h1>
      {
        dragIds.length !== 0 ?
        props.drag.map(item => {
          if(dragIds.includes(item.props.id)) {
            return(item);
          }
        })
        :
        "Drop here"
      }
    </div>
  );
}