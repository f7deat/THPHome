import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CalendarOutlined, EyeOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedNumber, history } from '@umijs/max';
import dayjs from 'dayjs';
import { Avatar, Button, Dropdown } from 'antd';

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
            className={`mb-4 ${isDragging ? 'dragging' : ''}`}
        >
            <div className='bg-slate-100 rounded hover:shadow-md cursor-pointer p-2'>
                <div className='font-medium line-clamp-3 mb-1' onClick={() => history.push(`/task/board/${task.id}`)}>{task.title}</div>
                <div>
                    <div className='py-2 flex items-center gap-1 mb-2 border-dashed border-b'>
                        <Avatar icon={<UserOutlined />} size="small" /> {task.assignedTo}
                    </div>
                    <div className="text-gray-500 text-xs">
                        <div className='flex justify-between items-center gap-1'>
                            <div className='flex-1'>
                                <span className="mr-2"><CalendarOutlined /> {dayjs(task.createdDate).format('DD/MM/YYYY HH:mm')}</span>
                                <span><EyeOutlined /> <FormattedNumber value={task.viewCount} /></span>
                            </div>
                            <Dropdown menu={{
                                items: [
                                    {
                                        key: 'view',
                                        label: 'Chi tiết',
                                        icon: <EyeOutlined />,
                                        onClick: () => {
                                            console.log('View task', task.id);
                                            history.push(`/task/board/${task.id}`);
                                        }
                                    }
                                ]
                            }}>
                                <Button icon={<MoreOutlined />} type="dashed" size="small" />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;