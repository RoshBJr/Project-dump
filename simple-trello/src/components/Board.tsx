import { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import {Column, Id} from '../types';
import ColumnContainer from './ColumnContainer';

export default function Board() {
    const [columns, setColumns] = useState<Column[]>([]);

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

    return(
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden">
            <div className="m-auto flex gap-4">
                <div className='flex gap-4'>
                    {
                        columns.map(col => {
                            return(
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                />
                            )
                        })
                    }
                </div>
                <button
                    onClick={createNewColumn}
                    className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-black border-2 border-gray p-4 ring-rose-500 hover:ring-2 flex gap-2"
                >
                    <PlusIcon/> Add Column
                </button>
            </div>
        </div>
    )

    function deleteColumn(id: Id) {
        const filteredColumn = columns.filter( col => col.id !== id);
        setColumns(filteredColumn);
    }

}