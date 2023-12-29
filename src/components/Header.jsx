import React, { useState } from 'react'
import logo  from '../assets/logo.png'
import iconUp  from '../assets/icon-chevron-up.svg'
import iconDown from '../assets/icon-chevron-down.svg'
import BoardDropdown from './BoardDropdown'
import BoardModal from '../modals/boardModal'
import { useDispatch, useSelector } from 'react-redux'
function Header({boardModal,setBoardModal}) {

    const dispatch = useDispatch();
  
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);

    const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <div className=' p-4 left-0 bg-black'>
        <header className='flex justify-between '>

            {/* left */}
            <div className='flex  items-center space-x-'>
                <img src={logo} alt='logo' className='h-8 w-16 mr-2 rounded-xl '/>
                <h2 className=' hidden md:inline-block text-white text-xl '>KANBAN</h2>
            </div>
            <div className='flex items-center ml-3'>
                <h3 className=' max-w[200px] md:text-2xl text-xl  text-white items-center'>{board.name}</h3>
                <img src={dropdownOpen? iconDown:iconUp} alt='dropdown'
                    className='w-5 h-4  mx-3'
                    onClick={() => setDropdownOpen(!dropdownOpen)} />
            </div>

            {/* right */}
            <div className=' flex space-x-3  '>
                <button className='button '
                    onClick={() =>{
                        setDropdownOpen(true)
                    }}
                >Edit Board</button>
            </div>
        </header>

        {dropdownOpen && <BoardDropdown setDropdownOpen = {setDropdownOpen} setBoardModal={setBoardModal} />}

        {boardModal && <BoardModal type={'add'} setBoardModal = {setBoardModal} />}


    </div>



        
    
  )
}

export default Header