import { Draggable } from "../components/Draggable";

export default function deleteTask(setTaskList, curId) {
    const lsTaskList = JSON.parse(localStorage.getItem("lsTaskList"));
    const newTasks = lsTaskList.filter(task => task.dragid != curId);

    setTaskList(newTasks.map(task => {
      return {
        dragid: task.dragid,
        dropid: task.dropid,
        taskUrgency: task.taskUrgency,
        taskName: task.taskName,
        blModify: task.blModify,
        dom:  
          <Draggable
            key={task.dragid}
            id={task.dragid} 
            setTaskList={setTaskList} 
            taskName={task.taskName}
            dropid={task.dropid}
            taskUrgency={task.taskUrgency}
          >
          </Draggable>
      }
    }));
}