import { Draggable } from "../components/Draggable";

export default function deleteTask(setTaskList, curId) {
    const lsTaskList = JSON.parse(localStorage.getItem("lsTaskList"));
    const newTasks = lsTaskList.filter(task => task.dragid != curId);

    setTaskList(newTasks.map(task => {
      return {
        dragid: task.dragid,
        dropid: task.dropid,
        dom:  <Draggable key={task.dragid} id={task.dragid} 
                setList={setTaskList}
              >
                {task.dom.props.children}
              </Draggable>
      }
    }));
}