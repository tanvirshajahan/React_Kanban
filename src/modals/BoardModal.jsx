import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import taskSlice from '../redux/TaskSlice'

function BoardModal({setBoardModal, type, prevName}) {
    const dispatch = useDispatch()
    const [name, setName] = useState(prevName!==''?prevName:'')
    const [isValid, setIsValid] = useState(false)
    const newColumn = []
    const boards = useSelector((state) => state.boards);

    const validate =()=>{
        setIsValid(false)
        if(!name.trim()){
            alert('error')
            return false
        }
        setIsValid(true)
        return true
    }

    const onSubmit = (type)=>{
        setBoardModal(false)
        if(type ==='edit'){
            //dispatch
            dispatch(taskSlice.actions.editBoard({name, newColumn}))
        }else{
            //dispatch
            dispatch(taskSlice.actions.addBoard({name, newColumn}))
        }
    }
  return (
    <div 
    className=' justify-center items-center flex py-10 px-10 fixed top-0 right-0 left-0 bottom-0 bg-[#00000080]'
    onClick={(e)=>{
        if(e.target!==e.currentTarget){
            return
        }
        setBoardModal(false)
        setBoardModal(false)

    }}
    >
        <div className='flex-col flex bg-white rounded px-4 py-4 space-y-2 max-w-md mx-auto my-auto w-full   '>
            <h1 className='text-lg mb-2'>
                {type=== 'edit'?'Edit':'Add '} Board
            </h1>
            <label>Board name </label>
            <input 
            className='border-2 md px-2 py-1 ' 
            placeholder='name'
            value={name}
            onChange={(e)=>{
                setName(e.target.value)
            }}
            id='board-name'
            ></input>
            <button className='button '
            onClick={() =>{
                const isvalid = validate()
                if(isvalid){
                    onSubmit(type)
                }
            }}
            
            >{type=== 'edit'?'Save':'Create New'} Board</button>

        </div>
        
    </div>
  )
}

export default BoardModal