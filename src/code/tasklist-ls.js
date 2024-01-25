import { Draggable } from "../components/Draggable";

export default function tasklistFromLs(lsTaskList, taskListHk) {
    if(!lsTaskList) return;
    const lsTasks = JSON.parse(lsTaskList);
    
    taskListHk(lsTasks.map(task => {
      return {
        dragid: task.dragid,
        dropid: task.dropid,
        taskUrgency: task.taskUrgency,
        taskName: task.taskName,
        urgOptions: task.urgOptions,
        dom:  
          <Draggable
            key={task.dragid}
            id={task.dragid} 
            setList={taskListHk} 
            taskName={task.taskName}
            dropid={task.dropid}
            taskUrgency={task.taskUrgency}
            urgOptions={task.urgOptions}
          >
          </Draggable>
      }
    }));
}