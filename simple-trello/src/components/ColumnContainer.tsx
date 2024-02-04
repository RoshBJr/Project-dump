import { Column, Id, Task } from "../types";
import TrashIcon from '../icons/TrashIcon';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    deleteTask: (id: Id) => void;
    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string, urgValue:string, dateModified: string) => void; 
    tasks: Task[];
}

export default function ColumnContainer(props:Props) {
    const {
        column,
        deleteColumn,
        updateColumn,
        createTask,
        tasks,
        deleteTask,
        updateTask
    } = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [tEditMode, setTEditMode] = useState<boolean>(false);
    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id);
    }, [tasks]);

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
            id: column.id,
            data: {
                type: "Column",
                column,
            },
            disabled: tEditMode,
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
                {...attributes}
                {...listeners}
                className="bg-gray-900 w-[350px] h-[80vh] max-h-[80vh] rounded-md flex flex-col opacity-40 border-2 border-rose-500"
            >
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="touch-none bg-gray-900 w-[350px] h-[80vh] max-h-[80vh] rounded-md flex flex-col">
            {/* Column title */}
            <div
                onClick={() => {
                    setEditMode(true);
                    setTEditMode(true);
                }}
                className="bg-black text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-900 border-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="flex justify-center items-center bg-gray-900 px-2 py-1 text-sm rounded-full">
                        0
                    </div>
                    {!editMode && column.title}
                    {
                        editMode && 
                        <input
                            className="bg-black focus:border-rose-500 border rounded outline-none px-2"
                            value={column.title}
                            onChange={
                                e => {
                                    updateColumn(column.id, e.target.value);
                                }
                            }
                            autoFocus
                            onBlur={() => {
                                    setEditMode(false);
                                    setTEditMode(false);
                                }
                            }
                            onKeyDown={
                                e => {
                                    if(e.key !== "Enter") return;
                                    setEditMode(false);
                                    setTEditMode(false);
                                }
                            }
                        />
                    }
                </div>
                <button
                    onClick={() => deleteColumn(column.id)} 
                    className="stroke-gray-500 hover:stroke-white hover:bg-gray-900 rounded-full px-1 py-2">
                    <TrashIcon/>
                </button>
            </div>
            {/* Column task container */}
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-scroll">
                <SortableContext
                    items={tasksIds}
                >
                    {
                        tasks.map( task => (
                            <TaskCard
                                setColEditMode={setTEditMode}
                                updateTask={updateTask}
                                key={task.id} 
                                task={task}
                                deleteTask={deleteTask} 
                            />
                        ))
                    }
                </SortableContext>
            </div>
            {/* Column footer */}
            <button
                onClick={() => {
                    createTask(column.id);
                }}
                className="flex gap-2 items-center border-gray-800 border-2 rounded-md p-4 hover:text-rose-500 hover:bg-gray-800 active:bg-black">
                <PlusIcon/>
                Add Task
            </button>
        </div>
    );
}