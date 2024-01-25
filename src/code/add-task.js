import { Draggable } from "../components/Draggable";
import generate from "./generateIds";

export function createTask(taskList, setTaskList, urge, taskName, container, dropids, urgOptions) {
  const id = generate();

  setTaskList(
    [...taskList, 
      {
        dragid: id,
        dropid: container,
        taskUrgency: urge,
        taskName: taskName,
        urgOptions: urgOptions,
        dom:  
          <Draggable
            key={id}
            id={id} 
            setList={setTaskList} 
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

export function modifyTask(taskList, setTaskList, urge, taskName, container, taskid) {
  setTaskList(
    [...taskList,
      taskList.map(task => {
        if(task.dragid == taskid) {
          return({
            dragid: taskid,
            dropid: container,
            taskUrgency: urge,
            taskName: taskName,
            dom:  
              <Draggable
                key={taskid}
                id={taskid} 
                setList={setTaskList} 
                taskList={taskList}
                taskName={taskName}
                dropid={container}
                taskUrgency={urge}
              >
              </Draggable>
          })
        }
        return task;
      })
    ]
  );
}