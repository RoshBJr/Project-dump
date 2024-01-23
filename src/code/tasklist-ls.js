import { Draggable } from "../components/Draggable";

export default function tasklistFromLs(lsTaskList, taskListHk) {
    if(!lsTaskList) return;
    const lsTasks = JSON.parse(lsTaskList);
    
    taskListHk(lsTasks.map(task => {
      return {
        dragid: task.dragid,
        dropid: task.dropid,
        dom:  <Draggable key={task.dragid} id={task.dragid} 
                setList={taskListHk}
              >
                {task.dom.props.children}
              </Draggable>
      }
    }));
}