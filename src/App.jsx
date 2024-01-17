import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './components/Droppable';
import {Draggable} from './components/Draggable';
import "./App.css"

export default function App() {
  const containers = ['To do', 'Doing', 'Done'];
  const draggables = [1, 2, 3];
  const [parent, setParent] = useState(null);
  const [lastDragged, setLastDragged] = useState([]);
  const draggableMarkup = (
    draggables.map(item => {
      return(
        <Draggable key={item} id={`draggable${item}`}>
          Drag me {item}
        </Draggable>
      )
    })
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="main">
        <div className="backlog">
          <h1>Backlog</h1>
          {
            draggableMarkup.map(item => {
              if(lastDragged.includes(item.props.id)) return;
              return(item)
            })
          }
        </div>
          {containers.map((id) => (
            <Droppable key={id} id={id} parent={parent} drag={draggableMarkup}
              lastDragged={lastDragged} >
            </Droppable>
          ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    if(event.over) {
      setLastDragged([...lastDragged, event.active.id]);
    } else {
      setLastDragged(
        lastDragged.filter( item => item !== event.active.id)
      )
    }
    setParent(event.over ? event : null);
  }
}