import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";

const Store =configureStore({
    reducer:{
        // here mention your slices
        user:UserSlice,
    }
})

export default Store;