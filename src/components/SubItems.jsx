import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import taskSlice from '../redux/TaskSlice';

function SubItems({index, taskIndex, colIndex}) {
    const dispatch = useDispatch()
    const boards = useSelector((state) =>state.boards)
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns
    const col = columns.find((col, i )=> i === colIndex)
    const task = col.tasks.find((task, i ) => i === taskIndex)
    const subtasks = task.subtasks.find((subtask, i)=> i===index)
    const ticked = subtasks.isCompleted


    const onChange = (e) =>{
        dispatch(taskSlice.actions.setSubtaskCompleted({index,taskIndex,colIndex}))
    }
    return (
        <div
        className='w-full flex rounded-md relative items-center justify-start  bg-white p-1 gap-2'
        >
            <input type='checkbox' className=' w-4 h-4 accent-slate-600 cursor-pointer'
            checked={ticked}
            onChange={onChange}
            />

            <p>
                {subtasks.title}
            </p>
        </div>
    )
}

export default SubItems