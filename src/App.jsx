import {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import "./App.css"
import handleDragEnd from './code/handle-drag-end';
import addTask from './code/add-task';
import backlog from './code/backlog';
import { useTaskListFromLs, useUpdatelsTask } from './code/use-effect';
import { buildDroppables } from './code/droppable';

export default function App() {
  const lsTaskList = localStorage.getItem("lsTaskList");
  const containers = ['To do', 'Doing', 'Done'];
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState('');

  // custom hook to use tasks from local storage
  useTaskListFromLs(lsTaskList,setTaskList);
  // custom hook to update tasks in local storage
  useUpdatelsTask(taskList);

  return (
    <DndContext onDragEnd={e => handleDragEnd(e,taskList,setTaskList)}>
      <div className="main">
        <div className="backlog">
          <h1>Backlog</h1>
          <input type="text" 
                placeholder='Enter new task'
                onChange={e => setTask(e.target.value)}
                onKeyDown={e => addTask(e,taskList,setTaskList,task,setTask)}
          />
          {
          // render backlog tasks
          backlog(taskList)
          }
        </div>
        {
        // render droppable areas
        buildDroppables(containers, taskList)
        }
      </div>
    </DndContext>
  );
}