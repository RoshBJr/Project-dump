import { useEffect } from "react";
import tasklistFromLs from "./tasklist-ls";

export const useTaskListFromLs = (lsTaskList, setTaskList) => {
    useEffect(()=> {
        // will only return data if ls has values
        tasklistFromLs(lsTaskList,setTaskList);
      }, []);
}

export const useUpdatelsTask = (taskList) => {
    useEffect(()=> {
      localStorage.setItem("lsTaskList", JSON.stringify(taskList));
    }, [taskList]);
}