import React, { useState } from 'react'
import pencil from '../assets/pencil.svg'
import trash from '../assets/trash.svg'
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import taskSlice from '../redux/TaskSlice';

function EditTaskModal({task, setEditModal, type, taskIndex, prevColIndex = 0}) {
   const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subtasks, setSubtasks] = useState([
        {title:'', isCompleted: false, id: uuidv4()},
    ])
    const [first, setFirst] = useState(true)

    
    const boards = useSelector((state) =>state.boards)
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns

    const col = columns.find((col, i )=> i === prevColIndex)

    const tasks = col.tasks.find((task, i )=> i === taskIndex)
    const [isValid, setIsValid] = useState(true)
    const [newColIndex, setNewColIndex] = useState(prevColIndex);

    if (type === "edit" && first) {
        setSubtasks(
          tasks.subtasks.map((subtasks) => {
            return { ...subtasks, id: uuidv4() };
          })
        );
        setTitle(boards.name);
        setDescription(boards.description);
        setFirst(false);
    }

      
    const validate =()=>{
        setIsValid(false)
        if(!title.trim()){
            // TODO Toast
            alert('Name cannot be empty')
            return false
        }
        if(!description.trim()){
            // TODO Toast
            alert('description cannot be empty')
            return false
        }

        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].title.trim()) {
                alert('list cannot have empty item')
              return false;
            }
        }
        

        setIsValid(true)
        return true
    }

    const deleteItem =(id)=>{
        setSubtasks((prevVal) =>
            prevVal.filter((i)=> i.id !==id)
        )
    }

    if(type==='edit' && first){
        setSubtasks(
            tasks.subtasks.map((subtask)=>{
                return {...subtask, id: uuidv4()}
            })
        )
        setTitle(tasks.title)
        setDescription(tasks.description)
        setFirst(false)
    }

    const onChange =(id,newVal) =>{
        setSubtasks((prevState)=>{
            const newState =[...prevState]
            const subtasks = newState.find((subtask)=> subtask.id === id)
            subtasks.title = newVal
            return newState
        })
    }

    const onSubmit = (type) => {
        if(type==='edit'){
            dispatch(taskSlice.actions.editTaskSubTasks(
                {
                    title,
                    description,
                    subtasks,
                    taskIndex,
                    prevColIndex,
                    newColIndex
                }
            ))
        }else{
            //add task
            dispatch(taskSlice.actions.addTask(
                {
                    title,
                    description,
                    subtasks,
                    taskIndex,
                    newColIndex
                }
            ))
        }
    }


    return (
        <div
        className='scrollbar-hide overflow-y-scroll bg-[#00000080] px-10 py-10 justify-center items- flex  fixed right-0 left-0 bottom-0 top-0 z-50'
        onClick={(e)=>{
            if(e.target!==e.currentTarget){
                return
            }
            setEditModal(false)
        }}
        >
            <div 
                className=' maxh[85vh] my-auto bg-white
                text-black font-bold shadow-md max-w-md mx-auto w-full px-8 py-8 rounded-xl
                space-y-3'
            >
                <h1 className='text-lg'>{type=== 'edit'?'Edit':'Add'} Task</h1>

                <h3 className='text-sm font-semibold'>Task Name</h3>
                <input
                    className='border-2 md px-2 py-1 w-full font-[400] ' 
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                    id='task-title'
                />

                <h3 className='text-sm font-semibold'>Description</h3>
                <textarea
                    className='border-2 md px-2 py-1 w-full font-[400]
                    h-30 ' 
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    id='task-description'
                />

                <h3 className='text-sm font-semibold'>SubTasks</h3>

                {subtasks.map((subtask,i)=>
                {
                    return(
                        <div
                        className=' flex px-2 rounded-md border-gray-600 border-2 p-1 justify-between'
                        key={i}
                        >
                            <input
                                className='text-xs w-full px-3 py-1
                                '
                                value={subtask.title}
                                onChange={(e) => {
                                    onChange(subtask.id, e.target.value);
                                    }}
                                />
                            <div className='flex'>

                                    <img src={trash} className='h-5 w-8' 
                                    onClick={()=>{
                                        deleteItem(subtask.id)

                                    }}/>
                                    
                            </div>                            
                        </div>
                    )
                })}

                <button className='button w-full bg-green-600 mt-3'
                    onClick={() =>{
                        setSubtasks((state)=>[
                            ...state,
                            {title:'', isCompleted: false, id: uuidv4()},
                        ])
                    }}> 
                    Add Section
                </button>

                <button className='button w-full'
                onClick={()=>{
                    const isvalid = validate()
                    if(isvalid){
                        onSubmit(type)
                        setEditModal(false)

                    }

                }}
                >Save</button>

            </div>
            
        </div>
    )
}

export default EditTaskModal