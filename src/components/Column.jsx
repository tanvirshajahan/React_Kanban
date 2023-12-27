import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Task from './Task';

function Column({colIndex}) {
    const dispatch = useDispatch();
    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-orange-500'
    ]
    const [color, setColor] = useState(null)
    const boards = useSelector((state) =>state.boards)
    const board = boards.find((board) => board.isActive === true);
    const col = board.columns.find((col, index) => index === colIndex)
    useEffect(() => {
      setColor( shuffle(colors).pop()) //one time
    
      
    }, [dispatch])
    
    return (
    <div
    className='scrollbar-hide mx-5 pt=[80px] min-w-[270px]' >
        <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
            <div className={`rounded-full w-4 h-4 ${color} `} />
            {col.name} ({col.tasks.length})
        </p>
        {col.tasks.map((task, index)=>(
            // console.log('123',task)
            <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
    </div> 
  )
}

export default Column