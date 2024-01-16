import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './components/Droppable';
import {Draggable} from './components/Draggable';
import "./App.css"

function App() {
  const containers = ['A', 'B', 'C'];
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

  useEffect(() => {
    // console.log(parent);
  }, [parent])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {
        draggableMarkup.map(item => {
          if(lastDragged.includes(item.props.id)) return;
          return(item)
        })
      }
      <div className="container-drop">
        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Droppable key={id} id={id} parent={parent} drag={draggableMarkup}
            lastDragged={lastDragged} >
          </Droppable>
        ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    const {over} = event;
    if(event.over) {
      setLastDragged([...lastDragged, event.active.id]);
    } else {
      setLastDragged(
        lastDragged.filter( item => item != event.active.id)
      )
    }
    setParent(event.over ? event : null);
  }
}

export default App;