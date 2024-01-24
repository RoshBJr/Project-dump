import {useState} from 'react';
import {DndContext, MouseSensor} from '@dnd-kit/core';
import "./App.css"
import handleDragEnd from './code/handle-drag-end';
import backlog from './code/backlog';
import { useTaskListFromLs, useUpdatelsTask } from './code/use-effect';
import { buildDroppables } from './code/droppable';
import "./output.css";
import TaskForm from './components/TaskForm';
import { useSensor } from '@dnd-kit/core';

export default function App() {
  const lsTaskList = localStorage.getItem("lsTaskList");
  const containers = ['To do', 'Doing', 'Done'];
  const urgencyOptions = ['Low','Alarming','Critical','Highest'];
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState('');

  // custom hook to use tasks from local storage
  useTaskListFromLs(lsTaskList,setTaskList);
  // custom hook to update tasks in local storage
  useUpdatelsTask(taskList);

  return (
    <DndContext
      onDragEnd={e => handleDragEnd(e,taskList,setTaskList)}
    >
      <div className="main">
        <div className="backlog">
          <h1>Backlog</h1>
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
      <TaskForm
        taskList={taskList}
        setTaskList={setTaskList}
        containers={containers}
        urgOptions={urgencyOptions}
      />
    </DndContext>
  );
}