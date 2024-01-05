import './App.css';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

function App() {
  const [parent, setParent] = useState(null);
  const draggable = (
    <Draggable id="draggable">
      <div className="container-d">
        Go ahead, drag me.
      </div>
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? 
          <div className="container-drop">{draggable}</div>
          : 
          <div className="container-drop">
            <h2 className="text">Drop here</h2>
          </div>
        }
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({over}) {
    setParent(over ? over.id : null);
  }
}

export default App;