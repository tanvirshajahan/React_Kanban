import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import menuIcon from '../assets/menuIcon.svg'
import Menu from '../components/menu'
import SubItems from '../components/SubItems'
import taskSlice from '../redux/TaskSlice'

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
    const [menu, setMenu] = useState(false)
    
    let completed = 0
    subtasks.forEach(subtask => {
        if(subtask.isCompleted){
            completed++
        }
    });

    const deleteTask = () =>{
        dispatch(taskSlice.actions.deleteTask({taskIndex,colIndex}))
        setTaskModal(false)
    }

    const editTask = () =>{
        dispatch(taskSlice.actions.deleteTask({taskIndex,colIndex}))
        setTaskModal(false)
    }


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
                className='flex relative justify-between  w-full bg-white rounded'>
                    <h1>{task.title}</h1>
                    <img 
                    onClick={()=>{
                        setMenu(!menu)
                    }}
                    src={menuIcon} className=' w-5 h-5 cursor-pointer'/>

                    {menu && <Menu setMenu= {setMenu} deleteTask ={deleteTask} task={task} />}
                </div>

                <div
                className='flex-col '
                >
                    <h1 className='text-sm text-gray-400 mt-2'>{`subtask completed 
                    ${completed} / ${subtasks.length} `}</h1>


                </div>
                <p
                className=' text-gray-400 font-serif text-sm pt-6 tracking-wide'
                >
                        {task.description}
                </p>

                <div
                className=' mt-2 space-y-2'
                >
                    {subtasks.map((item,index)=> {
                        return(
                            <SubItems
                            index ={index}
                            key={index}
                            taskIndex = {taskIndex}
                            colIndex = {colIndex}
                            />
                        )
                    })}
                </div>

            </div>
            

        </div>
    )
}

export default TaskModal