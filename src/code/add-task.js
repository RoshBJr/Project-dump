import { Draggable } from "../components/Draggable";
import generate from "./generateIds";

export default function addTask(taskList, setTaskList, urge, taskName, container) {
  const id = generate();

  setTaskList(
    [...taskList, 
      {
        dragid: id,
        dropid: container,
        taskUrgency: urge,
        taskName: taskName,
        dom:  
          <Draggable
            key={id}
            id={id} 
            setList={setTaskList} 
            taskList={taskList}
            taskName={taskName}
            dropid={container}
            taskUrgency={urge}
          >
          </Draggable>
      }
    ]
  );
}