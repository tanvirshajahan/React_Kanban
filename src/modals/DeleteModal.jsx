import React from 'react'
import { useDispatch } from 'react-redux'
import taskSlice from '../redux/TaskSlice'

function DeleteModal({boardName, setDeleteModal}) {
    const dispatch = useDispatch()
  return (
    <div 
    className=' justify-center items-center flex py-10 px-10 fixed top-0 right-0 left-0 bottom-0 bg-[#00000080]'
        onClick={(e)=>{
            if(e.target !== e.currentTarget){
                return
            }
            setDeleteModal(false)
    }}>
        <div className='flex-col flex bg-white rounded px-4 py-4 space-y-2 max-w-md mx-auto my-auto w-full   '>
            <label>Delete board</label>
            <div className='border-separate border-y-2'></div>
            <label>Are you sure want to delete '{boardName}' Board ?</label>
            <div className='flex space-x-2 justify-center'>
                <button className='button '
                onClick={()=>{
                    dispatch(taskSlice.actions.deleteBoard(boardName))
                    setDeleteModal(false)

                }}
                >Yes</button>
                <button className='button bg-red-500'
                 onClick={()=>{
                    setDeleteModal(false)
                 }}
                >no</button>
            </div>
            

        </div>
    </div>
  )
}

export default DeleteModal