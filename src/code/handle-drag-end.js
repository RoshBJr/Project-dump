import updateTaskList from "./update-tasklist";

export default function handleDragEnd(e, taskList, setTaskList) {
    if(e.over) updateTaskList(e.active.id, taskList, e.over.id, setTaskList);
    if(e.over == null && taskList.length !== 0) 
        updateTaskList(e.active.id, taskList, "",setTaskList);
  }