import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./TaskSlice";
const store = configureStore({
    reducer: {
        //redux slices
        boards: taskSlice.reducer
    }
})

export default store