import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import TaskModal from '../modals/TaskModal';

function Task({taskIndex, colIndex}) {
    const boards = useSelector((state) =>state.boards)
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns
    const col = columns.find((col, i )=> i === colIndex)
    const task = col.tasks.find((task, i )=> i === taskIndex)

    const [taskModal, setTaskModal] = useState(false)

    let completed = 0
    let subtasks = task.subtasks
    subtasks.forEach(subtask => {
        if(subtask.isCompleted){
            completed++
        }
    });

    const HandleDrag = (e)=>{
        e.dataTransfer.setData("text",JSON.stringify({taskIndex,prevColIndex: colIndex}))
    }
   
  return (
    <div>
        <div
        onDragStart={HandleDrag}
        draggable
        className='w-[280] first:my-5 rounded bg-white shadow-white py-4 px-5 hover:text-[#c75f5f] cursor-pointer'
        onClick={()=>{
            setTaskModal(true)
        }}
        >
            <p
            className='font-semibold tracking-tight'>
                {task.title}
            </p>

            <p
            className='text-xs text-gray-400 mt-1'>
                {completed} out of {subtasks.length}

            </p>
        </div>  
        {taskModal && <TaskModal
        colIndex = {colIndex}
        taskIndex = {taskIndex}
        setTaskModal= {setTaskModal}/>}
    </div>
  )
}

export default Task