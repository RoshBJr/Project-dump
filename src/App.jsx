import './App.css';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';

function App() {
  const [parent, setParent] = useState(null);
  const [drag, setDrag] = useState([]);
  const info = [
    {id: 1, text: "drag me 1"},
    {id: 2, text: "drag me 2"}
  ]
  const draggable = [];
  useEffect(() => {
    setDrag(
      info.map( i => {
        return(
          <Draggable id={`draggable${i.id}`}>
            <div className="container-d">{i.text}</div>
          </Draggable>
        )
      })
    );
  }, [])


  return (
    <DndContext onDragMove={handleDragEnd}>
      {/* {!parent ? draggable : null} */}
      {/* {console.log(drag)} */}
      {drag}
      <Droppable id="droppable">
        {parent === "droppable" ? 
          <div className="container-drop">{drag}</div>
          : 
          <div className="container-drop">
            <h2 className="text">Drop here</h2>
          </div>
        }
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({over}) {
    // setParent(over ? over.id : parent);
    console.log(over);
  }
}

export default App;