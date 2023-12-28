import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import pencil from '../assets/pencil.svg'
import trash from '../assets/trash.svg'
import DeleteModal from '../modals/DeleteModal'
import BoardModal from '../modals/boardModal'
import taskSlice from '../redux/TaskSlice'

function BoardDropdown({setDropdownOpen, setBoardModal}) {
    const dispatch = useDispatch()
    const boards = useSelector((state => state.boards))
    const [deleteModal, setDeleteModal] = useState(false)
    const [editBoardModal, setEditBoardModal] = useState(false)
    const [boardName, setBoardName] = useState('')
  return (
    <div 
    className=' z-50 py-10 px-10 absolute top-16 right-0 left-0 bottom-[-100vh] bg-[#00000080]'
    onClick={
        (e) => {
            if(e.target !==e.currentTarget){
                return
            }
            setDropdownOpen(false)
        }
    }
    >
        <div 
        className='bg-white rounded p-3'>
            <div className='flex items-center'>
                <h3>All Boards {boards.length}</h3>
                <button className='button ml-2'
                onClick={() => {
                    setDropdownOpen(false)
                    setBoardModal(true)
                }}
                >+ Add</button>

            </div>
            <div>
                {boards.map((board, index)=>(
                    <div className={` flex  justify-between  mt-2 px-5 py-4
                        ${board.isActive && 'bg-[#635fc7] rounded-full text-white '}`}
                        key={index} 
                        onClick={() => {
                            dispatch(taskSlice.actions.setBoardActive({ index }));
                            // setDropdownOpen(false)

                          }}>
                        {/* <div className='flex justify-between'>  */}
                            {board.name}

                        {/* </div> */}
                            
                        <div className='flex'>
                            {board.isActive &&  <img src={pencil} className='h-5 w-8' onClick={()=>{
                            setBoardName(board.name)
                            setEditBoardModal(true)
                        }}/>}
                   
                    <img src={trash} className='h-5 w-8 z-50' onClick={()=>{
                        setDeleteModal(true)
                        setBoardName(board.name)
                        // setDropdownOpen(false)
                        }}/>
               </div>
                    </div>
                )
                )}
               
            </div>
            
            {/* deletemodal */}
            {deleteModal && <DeleteModal boardName ={boardName} setDeleteModal={setDeleteModal} type={'Board'} />}
            {/* edit board */}
            {editBoardModal && <BoardModal type={'edit'} setBoardModal = {setEditBoardModal} prevName={boardName} />}

        </div>
    </div>
  )
}

export default BoardDropdown