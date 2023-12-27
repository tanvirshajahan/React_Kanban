import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function TaskModal({colIndex, taskIndex, setTaskModal}) {
    const dispatch = useDispatch()
    const boards = useSelector((state) =>state.boards)
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns
    const col = columns.find((col, i )=> i === colIndex)
    const task = col.tasks.find((task, i )=> i === taskIndex)
    let subtasks = task.subtasks

    const [completeStatus, setCompleteStatus] = useState(false)
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))
    
    let completed = 0
    subtasks.forEach(subtask => {
        if(subtask.isCompleted){
            completed++
        }
    });
    return (
        <div
            className=' justify-center items-center flex py-10 px-10 fixed top-0 right-0 left-0 bottom-0 bg-[#00000080]'
            onClick={(e)=>{
                if(e.target!==e.currentTarget){
                    return
                }
                setTaskModal(false)
            }}
        >
            <div
            className='scrollbar-hide overflow-y-scroll maxh[85vh] my-auto bg-white
             text-black font-bold shadow-md max-w-md mx-auto w-full px-8 py-8 rounded-xl'
            >
                <div
                className='flex relative  w-full bg-white rounded'>
                    <h1>{task.title}</h1>
                </div>

                </div>
            

        </div>
    )
}

export default TaskModal