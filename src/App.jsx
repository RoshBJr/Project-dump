import './App.css';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';
import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import CtnDrop from './components/CtnDrop';


function App() {
  const [parent, setParent] = useState([]);
  const [drag, setDrag] = useState([]);
  const info = [
    {id: 1, text: "drag me 1"},
    {id: 2, text: "drag me 2"},
    {id: 3, text: "drag me 3"}
  ];
  const ctn = [1,2,3];
  

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


  return(
    <DndContext onDragEnd={handleDragEnd}>
      {
        drag.map(item => {
          if(!parent.includes(item.props.id)){
            return(item)
          }
        })
      }
      <div className="drop-container">
        {ctn.map(item => {
          return(
            <CtnDrop
              key={item}
              id={item}
              parent={parent}
              setParent={setParent} 
              drag={drag}
            />
          )
        })}
      </div>
    </DndContext>
  );

  function handleDragEnd({active, over}) {
    isDoubled();
    setParent(active && over ? [...parent, active.id + over.id, active.id] : parent);
    if(over == null) {
      setParent(parent.filter(item => !item.includes(active.id)));
      console.log("yo");
    }
  }

  function isDoubled() {
    // let i = props.parent.reduce((acc, cur) => (cur == id ? acc+1: acc),0);
    // if(i == 1) return;
    let newParent = parent.filter((el, index) => {
      return parent.indexOf(el) === index;
    });
    if(newParent.length % 2 != 0) newParent.slice(2);
    // setDropContent(newParent);
    setParent(newParent);
  }
}

export default App;