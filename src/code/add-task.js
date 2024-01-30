import { Draggable } from "../components/Draggable";
import deleteTask from "./delete-task";
import generate from "./generateIds";

export function createTask(taskList, setTaskList, urge, 
  taskName, container, dropids, urgOptions) {
  const id = generate();

  setTaskList(
    [...taskList, 
      {
        dragid: id,
        dropid: container,
        taskUrgency: urge,
        taskName: taskName,
        urgOptions: urgOptions,
        blModify: false,
        dom:  
          <Draggable
            key={id}
            id={id} 
            setTaskList={setTaskList}
            taskList={taskList}
            taskName={taskName}
            dropid={container}
            taskUrgency={urge}
            dropids={dropids}
            urgOptions={urgOptions}
          >
          </Draggable>
      }
    ]
  );
}

export function modifyTask(taskList, setTaskList, urge, 
  taskName, container, dropids, urgOptions, modTaskId) {
    
    deleteTask(setTaskList, modTaskId);
    const newTaskList = taskList.filter(task => task.dragid !== modTaskId);
    const id = generate();

    setTaskList(
      [...newTaskList, 
        {
          dragid: id,
          dropid: container,
          taskUrgency: urge,
          taskName: taskName,
          urgOptions: urgOptions,
          blModify: false,
          dom:  
            <Draggable
              key={id}
              id={id} 
              setTaskList={setTaskList} 
              taskList={taskList}
              taskName={taskName}
              dropid={container}
              taskUrgency={urge}
              dropids={dropids}
              urgOptions={urgOptions}
            >
            </Draggable>
        }
      ]
    );
}