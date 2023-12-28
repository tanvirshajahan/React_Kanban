import React, { useState } from 'react'

function EditTaskModal({task, setEditModal}) {
    console.log('a',task)
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    return (
        <div
        className='bg-[#00000080] px-10 py-10 justify-center items- flex  fixed right-0 left-0 bottom-0 top-0 z-50'
        onClick={(e)=>{
            if(e.target!==e.currentTarget){
                return
            }
            setEditModal(false)
        }}
        >
            <div 
                className='scrollbar-hide overflow-y-scroll maxh[85vh] my-auto bg-white
                text-black font-bold shadow-md max-w-md mx-auto w-full px-8 py-8 rounded-xl
                space-y-3'
            >
                <h1 className='text-lg'>Edit Task</h1>

                <h3 className='text-sm font-semibold'>Task Name</h3>
                <input
                    className='border-2 md px-2 py-1 w-full font-[400] ' 
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    id='task-title'
                />

                <h3 className='text-sm font-semibold'>Description</h3>
                <textarea
                    className='border-2 md px-2 py-1 w-full font-[400]
                    h-40 ' 
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    id='task-description'
                />

                <h3 className='text-sm font-semibold'>SubTasks</h3>



                
                <button className='button w-full'>Save</button>

            </div>
            
        </div>
    )
}

export default EditTaskModal