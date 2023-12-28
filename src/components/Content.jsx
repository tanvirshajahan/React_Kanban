import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Column from './Column'
import EmptyPage from './EmptyPage'
import EditTaskModal from '../modals/EditTaskModal'
import BoardDropdown from './BoardDropdown'
import BoardModal from '../modals/boardModal'

function Content({boardModal, setBoardModal}) {
  const [addEditModal, setAddEditModal] = useState(false)
  // const [windowSize,setWindowSize] =useState(
  //  [ window.innerHeight,
  //   window.innerWidth,
  // ]
  // )

  const [sideBar, setsideBar] = useState(true)
  const boards = useSelector((state) =>state.boards)
  const currentBoard = boards.find((board) =>board.isActive === true)
  const columns = currentBoard.columns


  // useEffect(() =>{
  //   const handleWindow = () =>{
  //     setWindowSize([window.innerHeight, window.innerWidth])
  //   }

  //   window.addEventListener("resize", handleWindow)

  //   return ()=>{
  //     window.removeEventListener("resize", handleWindow)

  //   }
  // })
  return (
    <div className='scrollbar-hide h-screen flex bg-[#20212c]  overflow-x-scroll'>
      {columns.length > 0?(
        <>
        {columns.map((col, index) => (<Column key = {index} colIndex = {index}/>
        
        )
        )}
        <div
            onClick={() => {
              setAddEditModal(true);
            }}
            className=" h-screen bg-[#2b2c3740] flex justify-center items-center font-bold 
            text-2xl hover:text-[#635FC7]  cursor-pointer scrollbar-hide mx-5 min-w-[280px] 
            text-[#828FA3] rounded-lg "
          >
            Add New Section
          </div>
        </>)
        :
        <EmptyPage />
        }
        

            {addEditModal && <BoardModal type={'edit'} setBoardModal = {setAddEditModal}  />}

    </div>
  )
}

export default Content