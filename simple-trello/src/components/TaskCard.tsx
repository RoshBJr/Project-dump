import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
}

export default function TaskCard({task, deleteTask}: Props) {
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

    return(
        <div
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            className="bg-gray-950 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
        >
        {task.content}
        {
            mouseIsOver
            &&
            <button
                onClick={() => {
                    deleteTask(task.id);
                }}
                className="stroke-white absolute top-1/2-translate-y-1/2 bg-gray-800 rounded right-4 opacity-60 hover:opacity-100"
            >
                <TrashIcon/>
            </button>
        }
        </div>
    )
}