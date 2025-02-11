import { createSlice,PayloadAction } from "@reduxjs/toolkit";
 interface cartInterface{
    amount:number;
    
 }
 const initialState:cartInterface={
    amount:0
 }
const cartSlice=createSlice({
    name: "cart",
    initialState,
    reducers:{
        updateTotal:(state,action:PayloadAction<number>)=>{
            state.amount = action.payload
        }
    }
})
export const { updateTotal } = cartSlice.actions;
export default cartSlice.reducer;