import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import CustomSelect from "./CustomSelect";
import date from "../code/generateDate";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string, urgValue: string, dateModified:string) => void;
}
console.log(date());

export default function TaskCard({task, deleteTask, updateTask}: Props) {
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
    }
    
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = 
        useSortable(
        {
            id: task.id,
            data: {
                type: "Task",
                task,
            },
            disabled: editMode,
        }
    );

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if(isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-gray-950 p-2.5 min-h-[200px] h-[200px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"
            />
        )
    }

    if(editMode) {
        return(
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-gray-950 p-2.5 min-h-[200px] h-[200px] rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative flex
                flex-col justify-between"
            > 
                <textarea
                    className="h-1/4 w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
                    value={task.content}
                    autoFocus
                    placeholder="Task content here"
                    onKeyDown={ (e) => {
                            if(e.key === "Enter" && e.ctrlKey) {
                                toggleEditMode();
                            }
                        }
                    }
                    onChange={e => updateTask(task.id, e.target.value, task.urgValue, date())}
                >
                </textarea>
                <CustomSelect
                    task={task}
                    updateTask={updateTask}
                />
                <button
                    onClick={toggleEditMode}
                    className="absolute bottom-0 right-0 hover:text-rose-500 pr-4 pb-4">
                    Modify
                </button>
            </div>
        );
    }

    return(
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            className="bg-gray-950 p-2.5 min-h-[200px] h-[200px] rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task flex
            flex-col gap-5 justify-between"
        >
            <p className="w-[85%] h-1/3 flex-grow overflow-y-scroll overflow-hidden whitespace-pre-wrap break-words">
                {task.content}
            </p>
            {
                mouseIsOver
                &&
                <button
                    onClick={() => {
                        deleteTask(task.id);
                    }}
                    className="stroke-white absolute top-1/2 -translate-y-1/2 bg-gray-800 rounded right-4 opacity-60 hover:opacity-100"
                >
                    <TrashIcon/>
                </button>
            }
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <span>Modified:</span>
                    <span>{task.dateModified}</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-white" >Urgency:</span>
                    <span className="text-white">
                        {task.urgValue}
                    </span>
                </div>
            </div>
        </div>
    );
}