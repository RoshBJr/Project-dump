import { SetStateAction, useEffect, useState } from "react";
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
    setColEditMode: React.Dispatch<SetStateAction<boolean>>|null;
}

export default function TaskCard({task, deleteTask, updateTask, setColEditMode}: Props) {
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
    }

    useEffect(()=> {
        if(!setColEditMode) return;
        if(editMode) return setColEditMode(true);
        return setColEditMode(false);
    }, [editMode]);
    
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

    return(
        <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onMouseEnter={() => setMouseIsOver(true)}
                onMouseLeave={() => {
                    setEditMode(false);
                    setMouseIsOver(false);
                }}
                onMouseOver={() => setMouseIsOver(true)}
                className="border-2 border-rose-400 bg-gray-950 py-5 p-2.5 min-h-[200px] h-[200px] rounded-xl hover:border-rose-500 cursor-grab relative flex
                flex-col justify-between"
            > 
                <textarea
                    onClick={() => {
                        setEditMode(true);
                    }}
                    onBlur={() => {
                        setEditMode(false);
                    }}
                    onMouseOver={() => setMouseIsOver(true)}
                    className="pl-2 pt-1 h-1/4 w-full resize-none border-none outline outline-1 outline-rose-400 focus:outline-white hover:outline-rose-500 rounded bg-transparent text-white "
                    value={task.content}
                    placeholder="Task content here"
                    onKeyDown={ (e) => {
                            if(e.key === "Enter" && e.ctrlKey) {
                                setEditMode(false);
                                setMouseIsOver(false);
                                e.currentTarget.blur()
                            }
                        }
                    }
                    onChange={e => updateTask(task.id, e.target.value, task.urgValue, date())}
                >
                </textarea>
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
                <div className="flex flex-col gap-4">
                    <CustomSelect
                        task={task}
                        updateTask={updateTask}
                    />
                    <div className="flex gap-2">
                        <span>Modified:</span>
                        <span>{task.dateModified}</span>
                    </div>
                </div>
            </div>
    );
}