import { useEffect, useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import {Column, Id, Task} from '../types';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';
import date from '../code/generateDate';

export default function Board() {
    const lsTasks:Task[] = JSON.parse(localStorage.getItem("lsTasks") || '""');
    const lsColumns:Column[] = JSON.parse(localStorage.getItem("lsColumns")||'""');
    const [tasks, setTasks] = useState<Task[]>(lsTasks ? lsTasks: []);
    const [columns, setColumns] = useState<Column[]>(lsColumns ? lsColumns: []);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
    const [activeCol, setActiveCol] = useState<Column|null>(null);
    const [activeTask, setActiveTask] = useState<Task|null>(null);
    const sensors = useSensors(
            useSensor(PointerSensor, {
                activationConstraint: {
                    distance: 3, // have to drag for 3px to activate drag event
                }
            })
        );
    
    useEffect(() => {
        localStorage.setItem("lsTasks", JSON.stringify(tasks))
        localStorage.setItem("lsColumns", JSON.stringify(columns))
    }, [tasks, columns])

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
            urgency: ["None", "Low", "Alarming", "Critical", "Highest"],
            urgValue: "None",
            dateModified: date(),
        };

        setTasks([...tasks, newTask]);
    }
    
    const createNewColumn = () => {
        const columnToAdd:Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };
    
        setColumns([...columns, columnToAdd]);
    }

    function generateId() {
        return Math.floor(Math.random() * 10001);
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map( col => {
            if(col.id !== id) return col;
            return {...col, title};
        });
        setColumns(newColumns);
    }
    function deleteTask(taskId: Id) {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    }
    function updateTask(taskId: Id, content: string, urgValue: string, dateModified: string) {
        const newTasks = tasks.map( task => {
            if(task.id !== taskId) return task;
            return {...task, content, urgValue, dateModified};
        });
        setTasks(newTasks);
    }
    function onDragOver(event: DragOverEvent) {
        const {active, over} = event;

        if(!over) return;
        const activeId = active.id;
        const overId = over.id;
        if(activeId === overId) return;
        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";
        if(!isActiveATask) return;

        // I'm dropping a Task over another Task
        if(isActiveATask && isOverATask) {
            setTasks( tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                return arrayMove(tasks, activeIndex, overIndex);
            });
        }
        // I'm dropping a Task over another Column
        const isOverAColumn = over.data.current?.type === "Column";
        if(isActiveATask && isOverAColumn) {
            setTasks( tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                tasks[activeIndex].columnId = overId;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    return(
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="m-auto flex gap-4">
                    <div className='flex gap-4'>
                        <SortableContext items={columnsId}>
                            {
                                columns.map(col => {
                                    return(
                                        <ColumnContainer
                                            updateTask={updateTask}
                                            deleteTask={deleteTask}
                                            key={col.id}
                                            createTask={createTask}
                                            updateColumn={updateColumn}
                                            column={col}
                                            deleteColumn={deleteColumn}
                                            tasks={
                                                tasks.filter(
                                                    task => {
                                                        return(
                                                            task.columnId 
                                                            === 
                                                            col.id
                                                        );
                                                    } 
                                                )
                                            }
                                        />
                                    )
                                })
                            }
                        </SortableContext>
                    </div>
                    <button
                        onClick={createNewColumn}
                        className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-black border-2 border-gray p-4 ring-rose-500 hover:ring-2 flex gap-2"
                    >
                        <PlusIcon/> Add Column
                    </button>
                </div>
                {
                    createPortal(
                        <DragOverlay>
                            {
                                activeCol &&
                                <ColumnContainer
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                    createTask={createTask}
                                    updateColumn={updateColumn}
                                    column={activeCol}
                                    deleteColumn={deleteColumn}
                                    tasks={
                                        tasks.filter(
                                            task => {
                                                return(
                                                    task.columnId 
                                                    === 
                                                    activeCol.id
                                                );
                                            } 
                                        )
                                    }
                                />
                            }
                            {
                                activeTask &&
                                <TaskCard
                                    task={activeTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            }
                        </DragOverlay>,
                        document.body
                    )
                }
            </DndContext>
        </div>
    )

    function deleteColumn(id: Id) {
        const filteredColumn = columns.filter( col => col.id !== id);
        setColumns(filteredColumn);

        const newTasks = tasks.filter(t => t.columnId !== id);
        setTasks(newTasks);
    }

    function onDragStart(event: DragStartEvent) {
        if(event.active.data.current?.type === "Column" ) {
            return setActiveCol(event.active.data.current.column);
        }

        if(event.active.data.current?.type === "Task" ) {
            return setActiveTask(event.active.data.current.task);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveCol(null);
        setActiveTask(null);

        const {active, over} = event;
        if(active.data.current?.type === "Task") return;
        if(!over) return;
        const activColId = active.id;
        const overColumnId = over.id;
        if(activColId === overColumnId) return;
        setColumns(
            columns => {
                const activeColIndex = 
                    columns.findIndex(col => col.id === activColId);
                const overColIndex =
                    columns.findIndex(col => col.id === overColumnId);
                return arrayMove(columns, activeColIndex, overColIndex);
            }
        );
    }
}