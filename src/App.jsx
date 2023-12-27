
import React, { useState } from "react"
import Header from "./components/Header"
import Content from "./components/Content"
import { useDispatch, useSelector } from "react-redux"
import taskSlice from "./redux/TaskSlice";
import EmptyPage from "./components/EmptyPage";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state =>state.boards))
  const active = boards.find(board => board.isActive)

  if(!active && boards.length > 0){
    dispatch(taskSlice.actions.setBoardActive({index:0}))
  }

  const [boardModal, setBoardModal] = useState(false)

  return (
    <div>
      {boards.length == 0 ?
        <EmptyPage />
        :
        <div>
        {/* HEADER */}
        <Header boardModal ={boardModal}  setBoardModal ={setBoardModal}/>

        {/* CONTENT */}
        <Content boardModal ={boardModal}  setBoardModal ={setBoardModal}/>
      </div>
      }
     
    </div>

  )
}

export default App