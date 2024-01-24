export default function updateTaskList(activeid, taskList, overid, setTaskList) {
  const newTaskList =
    taskList.map(task => {
        if(task.dragid == activeid) return {...task, dropid: overid};
        return task;
    });
    setTaskList(newTaskList);
}