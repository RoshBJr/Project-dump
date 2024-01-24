import { Droppable } from "../components/Droppable";

export const buildDroppables = (containers, taskList) => {
	return (
		containers.map(
			(id) => (
				<Droppable 
					key={id}
					id={id}
					taskList={taskList}
				>
				</Droppable>
			)
		)
	);
}

export const droppableTasks = (taskList, curDropId) => {
	return (
		taskList && taskList.map(
			task => {
          		if(task.dropid == curDropId) return task.dom;
          		return;
			}
		)
	);
}