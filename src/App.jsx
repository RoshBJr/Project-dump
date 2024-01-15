import './App.css';
import {Draggable} from './components/Draggable';
import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import CtnDrop from './components/CtnDrop';


function App() {
  const [mainParent, setMainParent] = useState([]);
  const [drag, setDrag] = useState([]);
  const [dragStat, setDragStat] = useState([]);
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
          <Draggable key={Math.random()} id={`draggable${i.id}`} >
            <div className="container-d">{i.text}</div>
          </Draggable>
        )
      })
    );
    setMainParent(
      ctn.map(i => {
        return({[`droppable${i}`]:[]})
      })
    );
    setDragStat(drag);
  }, [])

  useEffect(() => {
    console.log(dragStat);
  }, [dragStat])

  useEffect(() => {
    drag.map(item => {
      // if(!(Object.keys(mainParent).includes(item.props.id))){
        // Object.values(mainParent[0])[0].includes(item.props.id)
        mainParent.forEach(drop => {
          if(drop[Object.keys(drop)[0]].includes(item.props.id)) {
            if(dragStat === drag) {
              setDragStat(drag.filter( i => i != item));
            } else {
              setDragStat(dragStat.filter( i => i != item));
            }
          }
        })
      // }
    })
  }, [mainParent])

  return(
    <DndContext onDragEnd={handleDragEnd}>
      {

      }
      {
        dragStat.length != 0 ?
        dragStat.map(item => {return item;})
        :
        drag.map(item => {return item;})
      }
      <div className="drop-container">
        {ctn.map(item => {
          return(
            <CtnDrop
              key={item}
              id={item}
              mainParent={mainParent}
              setMainParent={setMainParent} 
              drag={drag}
            />
          )
        })}
      </div>
    </DndContext>
  );

  function handleDragEnd({active, over}) {
    if(over && active) {
      mainParent.forEach(i => {
        if(i[over.id]) {
          i[over.id].push(active.id);
        }
      });
      setMainParent([...mainParent]);
    }
    // if(over == null) {
    //   setMainParent(mainParent.filter(item => !item.includes(active.id)));
    // }
  } 
}

export default App;