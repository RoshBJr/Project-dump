import { Draggable } from "../components/Draggable";
import generate from "./generateIds";

export default function addTask(e, taskList, setTaskList, task, setTask) {
  if(!(e.key === "Enter" && task !== '')) return;
  
  const id = generate();

  setTaskList(
    [...taskList, 
      {
        dragid: id,
        dropid: "",
        dom:  
          <Draggable
            key={id}
            id={id} 
            setList={setTaskList} 
            taskList={taskList}
          >
            {task}
          </Draggable>
      }
    ]
  );

  setTask(e.target.value = '');
}