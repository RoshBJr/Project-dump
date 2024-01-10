import './App.css';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';

function App() {
  const [parent, setParent] = useState([]);
  const [drag, setDrag] = useState([]);
  const info = [
    {id: 1, text: "drag me 1"},
    {id: 2, text: "drag me 2"},
    {id: 3, text: "drag me 3"}
  ]
  
  useEffect(() => {
    setDrag(
      info.map( i => {
        return(
          <Draggable key={Math.random()} id={`draggable${i.id}`}>
            <div className="container-d">{i.text}</div>
          </Draggable>
        )
      })
    );
  }, [])


  return (
    <DndContext onDragEnd={handleDragEnd}>
      {drag.map(item => {
        if(!parent.includes(item.props.id)){
          return(item)
        }
      })
      }
      <Droppable id="droppable">
        <div className="container-drop">
          {parent.length != 0 ? 
            drag.map(item => {
              if(parent.includes(item.props.id)) {
                return(item)
              }
            })
            : 
            <h2 className="text">Drop here</h2>
          }
        </div>
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({active, over}) {
    setParent(active ? [...parent, active.id] : parent);
    if(over == null) {
      setParent(parent.filter(item => item != active.id));
    }
  }
}

export default App;