import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './task-card';

interface Task {
    id: number;
    title: string;
    description: string;
}

interface Props {
    title: string;
    tasks: Task[];
    column: string;
}

const Column: React.FC<Props> = ({ title, tasks, column }) => {
    const { setNodeRef } = useDroppable({
        id: column,
        data: { column },
    });

    return (
        <div ref={setNodeRef} className="p-4 bg-gray-100 rounded border border-blue-500">
            <h2 className="font-bold mb-2">{title}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Column;