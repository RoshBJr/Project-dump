import { useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import {Column, Id} from '../types';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

export default function Board() {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
    const [activeCol, setActiveCol] = useState<Column|null>(null);
    const sensors = useSensors(
            useSensor(PointerSensor, {
                activationConstraint: {
                    distance: 3, // have to drag for 3px to activate drag event
                }
            })
        );

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

    return(
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <div className="m-auto flex gap-4">
                    <div className='flex gap-4'>
                        <SortableContext items={columnsId}>
                            {
                                columns.map(col => {
                                    return(
                                        <ColumnContainer
                                            key={col.id}
                                            updateColumn={updateColumn}
                                            column={col}
                                            deleteColumn={deleteColumn}
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
                                    updateColumn={updateColumn}
                                    column={activeCol}
                                    deleteColumn={deleteColumn} 
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
    }

    function onDragStart(event: DragStartEvent) {
        console.log("DRAG START", event);
        if(event.active.data.current?.type === "Column" ) {
            return setActiveCol(event.active.data.current.column);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const {active, over} = event;

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