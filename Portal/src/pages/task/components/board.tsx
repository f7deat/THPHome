import React from 'react';
import Column from './column';

interface Props {
    data?: any[];
}

const Board: React.FC<Props> = ({ data }) => {

    return (
        <div className='overflow-x-auto'>
            <div className="grid grid-cols-7 gap-2 min-w-[1800px]">
                {
                    data?.map((column: any) => (
                        <Column key={column.id} title={column.title} tasks={column.items} column={column.key} />
                    ))
                }
            </div>
        </div>
    );
};

export default Board;