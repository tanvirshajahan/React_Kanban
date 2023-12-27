import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Column from './Column'
import EmptyPage from './EmptyPage'

function Content({boardModal, setBoardModal}) {

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
    <div className='h-screen flex dark:bg-[#20212c]'>
      {columns.length > 0?(
        <>
        {columns.map((col, index) => (<Column key = {index} colIndex = {index}/>)
        )}
        </>)
        :
        <EmptyPage />
        }
    </div>
  )
}

export default Content