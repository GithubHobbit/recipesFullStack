import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dishReducer from "./dishSlice";

export default configureStore({
    reducer: {
        users: userReducer,
        dishes: dishReducer, 
    }
})