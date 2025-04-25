import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './task-card';
import { ProCard } from '@ant-design/pro-components';

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
        <ProCard title={title} headerBordered size='small'>
            <div ref={setNodeRef}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </ProCard>
    );
};

export default Column;