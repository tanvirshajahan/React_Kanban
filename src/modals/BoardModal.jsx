import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import taskSlice from '../redux/TaskSlice'
import trash from '../assets/trash.svg'
import { v4 as uuidv4 } from "uuid";


function BoardModal({setBoardModal, type, prevName}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(true)
    const [first, setFirst] = useState(true)
    const boards = useSelector((state) => state.boards).find(
        (board) => board.isActive
      );    
    //   const newColumn =[]
    const [newColumns, setNewColumns] = useState([
        { name: "Todo", tasks: [], id: uuidv4() },
        { name: "Current", tasks: [], id: uuidv4() },
      ]);

    if(type === 'edit' && first ){
        setName(boards.name)
        setFirst(false)
        setNewColumns(
            boards.columns.map((column,i) =>{
                return { ...column, id: uuidv4() };
            })
        )
    }

    const onChange = (id, newValue) => {
        setNewColumns((prevState) => {
          const newState = [...prevState];
          const column = newState.find((col) => col.id === id);
          column.name = newValue;
          return newState;
        });
      };

    const deleteItem =(id)=>{
        setNewColumns((prevVal) =>
            prevVal.filter((i)=> i.id !==id)
        )
    }

    const validate =()=>{
        setIsValid(false)
        if(!name.trim()){
            // TODO Toast
            alert('Name cannot be empty')
            return false
        }

        if (type === "edit" && first) {
            setNewColumns(
              boards.columns.map((col) => {
                return { ...col, id: uuidv4() };
              })
            );
            setName(boards.name);
            setIsFirstLoad(false);
        }

        for (let i = 0; i < newColumns.length; i++) {
            if (!newColumns[i].name.trim()) {
                alert('list cannot have empty item')
              return false;
            }
        }
        setIsValid(true)
        return true
    }

    const onSubmit = (type)=>{
        setBoardModal(false)
        if(type ==='edit'){
            //dispatch
            dispatch(taskSlice.actions.editBoard({name, newColumns}))
        }else{
            //dispatch
            dispatch(taskSlice.actions.addBoard({name, newColumns}))
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

    }}
    >
        <div className='flex-col flex bg-white rounded-xl px-4 py-4 space-y-2 max-w-md mx-auto my-auto w-full   '>
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
            />

            <div>
                <h1>Sections</h1>
                {newColumns.map((column, i) =>(
                    <div key={i}
                    className='flex px-4 py-1 justify-between items-center '
                    >
                        <input 
                            className='border-2 w-full rounded-lg mr-2 px-2 '
                            value={column.name}
                            onChange={(e)=>onChange(column.id, e.target.value)}
                        />
                        <img src={trash} className=' h-5 cursor-pointer'
                          onClick={()=>
                            deleteItem(column.id)
                        }/>
                    </div>
                ))}

                <button className='button w-full bg-green-600 mt-3'
                    onClick={() =>{
                        setNewColumns((state)=>[
                            ...state,
                            { name: "", tasks: [], id: uuidv4() },
                        ])
                }}
                > 
                Add Section
                </button>
            </div>
            
            <button className='button'
                onClick={() =>{
                    const isValid = validate()
                    if(isValid){
                        onSubmit(type)
                    }
                }}
            >{type=== 'edit'?'Save':'Create New'} Board</button>

        </div>
    </div>
  )
}

export default BoardModal