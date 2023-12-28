import React, { useState } from 'react'
import DeleteModal from '../modals/DeleteModal';
import EditTaskModal from '../modals/EditTaskModal';

function Menu({setMenu, task, deleteTask, taskIndex, prevColIndex = 0 }) {
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
  return (
    <div className='absolute  top-1  right-4'>

        <div className=" flex justify-end items-center ">
            <div className=" w-40 text-sm z-50 font-medium shadow-xl shadow-[#364e7e1a] bg-gray-500  space-y-4 py-5 px-4 rounded-lg  h-auto pr-12">
            <p
                onClick={() => {
                setEditModal(true)
                }}
                className=" cursor-pointer dark:text-gray-400 text-gray-700"
            >
                Edit
            </p>

            <p
                onClick={() => {
                    setDeleteModal(true)
                    }

                }
                className=" cursor-pointer text-red-500"
            >
                Delete
            </p>
            </div>


        </div>
        {/* deletemodal */}
        {deleteModal && <DeleteModal deleteTask ={deleteTask} setDeleteModal={setDeleteModal}  boardName={task.title} type={'Task and Subtask'} />}
        {/* editModal */}
        {editModal && <EditTaskModal type={'edit'}  task={task} deleteTask ={deleteTask} setEditModal={setEditModal}
        taskIndex = {taskIndex} prevColIndex={prevColIndex  }
        />}

    </div>
  )
}

export default Menu