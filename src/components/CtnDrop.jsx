import { useEffect, useState } from 'react';
import {Droppable} from '../components/Droppable';
import { DndContext } from '@dnd-kit/core';

export default function CtnDrop(props) {
  const [parent, setParent] = useState([]);

  useEffect(() => {
    setParent(props.mainParent);
    // console.log(props.drag[0].props.dropid);
    props.drag.map(item => {
      // console.log(item.props.dropid);
    })
  }, [props.mainParent, props.drag])

  return (
      <Droppable id={`droppable${props.id}`}>
        <div className="container-drop">
          {parent.length != 0 ? 
            props.drag.map(item => {
              let id = `droppable${props.id}${item.props.id}`;
              if(parent.includes(id)) {
                // console.log(item);
                return(item)
              }
            })
            : 
            <h2 className="text">Drop here</h2>
          }
        </div>
      </Droppable>
  );

  function handleDragEnd({active, over}) {
    setParent(active && over ? [...parent, active.id] : parent);
    if(over == null) {
      setParent(parent.filter(item => !item.includes(active.id)));
    }
  }
}