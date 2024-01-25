import { Draggable } from "../components/Draggable";

export function updateTaskList(activeid, taskList, overid, setTaskList) {
  const newTaskList =
    taskList.map(task => {
        if(task.dragid == activeid) return {...task, dropid: overid};
        return task;
    });
    setTaskList(newTaskList);
}

export function updateTaskListModify(setTaskList, dragid, modNewState) {
    const lsTaskList = JSON.parse(localStorage.getItem("lsTaskList"));
    // const newTasks = lsTaskList.filter(task => task.dragid == dragid);
    setTaskList(lsTaskList.map(task => {
      if(task.dragid == dragid) {
        return buildDrag(modNewState, task, setTaskList);
      }
      return buildDrag(task.blModify, task, setTaskList);      
    }));
    
}


function buildDrag(blModify, task, setTaskList) {
  return {
    dragid: task.dragid,
    dropid: task.dropid,
    taskUrgency: task.taskUrgency,
    taskName: task.taskName,
    blModify: blModify,
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
}