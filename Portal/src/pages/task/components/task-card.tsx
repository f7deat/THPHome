import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ProCard } from '@ant-design/pro-components';

interface TaskCardProps {
    task: any
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task.id,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`task-card mb-4 ${isDragging ? 'dragging' : ''}`}
        >
            <ProCard title={task.title} headerBordered hoverable size='small'>
                <p>{task.description}</p>
            </ProCard>
        </div>
    );
};

export default TaskCard;