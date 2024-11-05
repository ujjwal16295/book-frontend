import {createSlice} from "@reduxjs/toolkit"


const initialState = []



const UserSlice = createSlice({
    name:'user',
    initialState,
    // it will take a object it will have actioncreator 
    reducers:{
       // it is add function to add to store 
        add(state,action){
            // we will data from action and will update to store using state
            // state.push(action.payload)

            state.push(action.payload)

        },

        //it is a function to remove a item
        remove(state,action){
           state.pop()
        }
    }
})
// to import actions
export const {add,remove}=UserSlice.actions;

//to import reducer
export default UserSlice.reducer;