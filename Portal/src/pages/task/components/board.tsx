import React, { useState } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import Column from './column';
import TaskCard from './task-card';

interface Task {
    id: number;
    title: string;
    description: string;
}

interface Props {
    tasks: {
        todo: Task[];
        inProgress: Task[];
        completed: Task[];
        canceled: Task[];
    };
}

const Board: React.FC<Props> = ({ tasks: initialTasks }) => {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handleDragStart = (event: any) => {
        const { active } = event;

        const sourceColumn = Object.keys(tasks).find((key) =>
            tasks[key as keyof typeof tasks].some((task) => task.id === active.id)
        ) as keyof typeof tasks;

        if (sourceColumn) {
            const task = tasks[sourceColumn].find((task) => task.id === active.id);
            setActiveTask(task || null);
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        setActiveTask(null);

        if (!over || active.id === over.id) return;

        const sourceColumn = Object.keys(tasks).find((key) =>
            tasks[key as keyof typeof tasks].some((task) => task.id === active.id)
        ) as keyof typeof tasks;

        const destinationColumn = over.data.current?.column;

        if (sourceColumn && destinationColumn && sourceColumn !== destinationColumn) {
            const sourceTasks = tasks[sourceColumn];
            const destinationTasks = tasks[destinationColumn];

            const taskToMove = sourceTasks.find((task) => task.id === active.id);

            if (taskToMove) {
                setTasks({
                    ...tasks,
                    [sourceColumn]: sourceTasks.filter((task) => task.id !== active.id),
                    [destinationColumn]: [...destinationTasks, taskToMove],
                });
            }
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-4 gap-4">
                <Column title="To Do" tasks={tasks.todo} column="todo" />
                <Column title="In Progress" tasks={tasks.inProgress} column="inProgress" />
                <Column title="Completed" tasks={tasks.completed} column="completed" />
                <Column title="Canceled" tasks={tasks.canceled} column="canceled" />
            </div>

            {/* DragOverlay for animation */}
            <DragOverlay>
                {activeTask ? (
                    <TaskCard task={activeTask} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Board;