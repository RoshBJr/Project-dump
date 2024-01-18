import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from './components/Droppable';
import {Draggable} from './components/Draggable';
import "./App.css"
import generate from './code/generateIds';

export default function App() {
  let lsTaskList = localStorage.getItem("taskList");
  let lsParent = localStorage.getItem("parent");
  let lsLastDragged = localStorage.getItem("lastDragged");
  const containers = ['To do', 'Doing', 'Done'];
  const [parent, setParent] = useState(
    lsParent ? JSON.parse(lsParent): null
  );
  const [lastDragged, setLastDragged] = useState(
    lsLastDragged ? JSON.parse(lsLastDragged):[]
  );
  const [task, setTask] = useState('');
  const [renderList, setRenderList] = useState([]);
  const [taskList, setTaskList] = useState(
    lsTaskList ? JSON.parse(lsTaskList): []
  );
  
  function afficherMsg(evt) {
    if(evt.key === "Enter" && task !== '') {
      let id = generate()
      setTaskList([...taskList, {id: generate(), text: task}]);
      setTask(evt.target.value = '');
    }
  }
  
  useEffect(() => {
    // if(taskList.length == 0) return;
    localStorage.setItem("taskList", JSON.stringify(taskList));
    setRenderList(
      taskList.map(item => {
        return(
          <Draggable key={item.id} 
              id={item.id}
              task={task}
              taskList={taskList}
              setTaskList={setTaskList}
              setLastDragged={setLastDragged}
              lastDragged={lastDragged}
              parent={parent}
              setParent={setParent}
          >
            {item.text}
          </Draggable>
        )
      })
    );
  },[taskList])

  useEffect(() => {
      localStorage.setItem("lastDragged", JSON.stringify(lastDragged));
  }, [lastDragged])

  useEffect(() => {
    if(parent !== null) {
      localStorage.setItem("parent", JSON.stringify(parent));
    }
  }, [parent])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="main">
        <div className="backlog">
          <h1>Backlog</h1>
          <input type="text" 
                placeholder='Enter new task'
                onChange={evt=> setTask(evt.target.value)}
                onKeyDown={evt=> afficherMsg(evt)}
          />
          {
            renderList.map(item => {
              if(lastDragged.includes(item.props.id)) return;
              return(item)
            })
          }
        </div>
          {containers.map((id) => (
            <Droppable key={id} id={id} parent={parent} drag={renderList}
              lastDragged={lastDragged} setLastDragged={setLastDragged} >
            </Droppable>
          ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    let stuff={};
    if(event.over) {
      setLastDragged([...new Set([...lastDragged, event.active.id])]);
    } else {
      setLastDragged(
        [...new Set(lastDragged.filter( item => item !== event.active.id))] 
      )
    }
    stuff[0] = event.over;
    stuff[1] = event.active;
    // console.log(stuff);
    setParent(event.over ? stuff : null);
  }
}