export default function backlog(taskList) {
    return taskList && taskList.map(task => {
        if(task.dropid !== "") return;
        return task.dom;
    })
}