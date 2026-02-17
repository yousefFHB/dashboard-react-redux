import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.token=null;
            state.user=null;
        },
        login:(state,action)=>{
            state.token=action.payload.token;
            state.user=action.payload.user;
        }
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;