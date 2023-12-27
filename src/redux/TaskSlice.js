import {createSlice} from '@reduxjs/toolkit'
import data from '../redux/data.json'
const taskSlice = createSlice({
    name:'boards',
    initialState: data.boards,
    reducers : {
        addBoard: (state, action) =>{
            const isActive = state.length> 0 ? false:true;
            const payload = action.payload;
            const board = {
                id: payload.name,
                name: payload.name,
                isActive,
                columns:[]
            };
            board.columns = payload.columns;
            state.push(board)
        },
        deleteBoard: (state,action) =>{
            const payload = action.payload
            const board = state.find((board) => board.name === payload);
            state.splice(state.indexOf(board), 1)
        },
        editBoard: (state,action)=>{
            const payload = action.payload
            console.log('action',action)
            const board = state.find((board) => board.isActive);
            board.name = payload.name;
            board.columns = payload.columns
        },
        setBoardActive: (state, action) => {
            state.map((board, index) => {
              index === action.payload.index
                ? (board.isActive = true)
                : (board.isActive = false);
              return board;
            });
          },

    }
})

export default taskSlice