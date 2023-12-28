import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Task from './Task';
import taskSlice from '../redux/TaskSlice';
import EditTaskModal from '../modals/EditTaskModal';

function Column({colIndex}) {
    const dispatch = useDispatch();
    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-orange-500',
        'bg-lime-500',
        'bg-purple-500',
        'bg-violet-500',
    ]
    const [color, setColor] = useState(null)
    const boards = useSelector((state) =>state.boards)
    const board = boards.find((board) => board.isActive === true);
    const col = board.columns.find((col, index) => index === colIndex)
    const [addTaskModal, setAddTaskModal] = useState(false)

    useEffect(() => {
      setColor( shuffle(colors).pop()) //one time
    }, [dispatch])

    const HandleDrop =(e)=> {
        const {prevColIndex, taskIndex} = JSON.parse(
            e.dataTransfer.getData("text")
        )


        if(colIndex !== prevColIndex){
            dispatch(taskSlice.actions.dragTile({colIndex,prevColIndex, taskIndex}))
        }

    }
    const handleDragOver = (e) => {
        e.preventDefault();
      };
    
    return (
    <div
    onDrop={HandleDrop}
    onDragOver={handleDragOver}
    className='scrollbar-hide mx-5 pt=[80px] min-w-[270px]' >
        <div className=" mt-2 font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
            <p className={`rounded-full w-4 h-4 ${color} `} />
            {col.name} ({col.tasks.length})
        </div>
        {col.tasks.map((task, index)=>(
                <>
                    <Task key={index} taskIndex={index} colIndex={colIndex} />
                </>        
            )
        )}
         <div>
            <button className='button w-full mt-4'
            onClick={()=>{
                setAddTaskModal(true)
            }}
            >Add Task</button>
        </div>

        {addTaskModal && <EditTaskModal setEditModal={setAddTaskModal} type={'add'} taskIndex={colIndex} prevColIndex={colIndex}  />}
       
    </div> 
  )
}

export default Column