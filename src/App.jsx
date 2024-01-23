import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Droppable} from './components/Droppable';
import {Draggable} from './components/Draggable';
import "./App.css"
import generate from './code/generateIds';
import tasklistFromLs from './code/tasklist-ls';

export default function App() {
  const lsTaskList = localStorage.getItem("lsTaskList");
  const containers = ['To do', 'Doing', 'Done'];
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState('');
  
  function afficherMsg(evt) {
    if(evt.key === "Enter" && task !== '') {
      let id = generate()
      setTaskList([...taskList, {
        dragid: id,
        dropid: "",
        dom:  <Draggable key={id} id={id} setList={setTaskList} 
                taskList={taskList}>
                {task}
              </Draggable>
      }]);
      setTask(evt.target.value = '');
    }
  }
  useEffect(()=> {
    // will only return data if ls has values
    tasklistFromLs(lsTaskList,setTaskList);
  }, []);

  function updateTaskList(activeid, taskList, overid) {
    const newTaskList =
        taskList.map(task => {
          if(task.dragid == activeid) {
            return {...task, dropid: overid};
          } else {
            return task
          }
        });
        setTaskList(newTaskList);
  }

  useEffect(()=> {
    localStorage.setItem("lsTaskList", JSON.stringify(taskList));
  }, [taskList]);

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
            taskList && taskList.map(task => {
              if(task.dropid !== "") return;
              return task.dom;
            })
          }
        </div>
          {containers.map((id) => (
            <Droppable 
              key={id}
              id={id}
              taskList={taskList}
            >
            </Droppable>
          ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(e) {
    if(e.over == null && taskList.length !== 0) 
      updateTaskList(e.active.id, taskList, "");
    if(e.over == null) return;
    if(e.over) updateTaskList(e.active.id, taskList, e.over.id);
  }
}