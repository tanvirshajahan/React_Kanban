import React, { useState } from 'react'
import BoardModal from '../modals/boardModal'

function EmptyPage() {
    const [addModal, setAddModal] = useState(false)
  return (
    <div className='flex justify-center items-center fixed top-0 right-0 left-0 bottom-0'>
        <div className='flex-col p-3 m-3'>
            <h3>Board is empty. Why not add one?</h3>

            <button 
            className='button items-center w-full mt-2' 
            onClick={()=>{
                setAddModal(true)
            }}
            > Add Board</button>
            
        </div>

        {addModal && <BoardModal setBoardModal = {setAddModal} />}
    </div>
  )
}

export default EmptyPage