import { createSlice } from '@reduxjs/toolkit'




export const productSlice =createSlice({
    name:'productSlice',
    initialState:[],
    reducers:{
        addToCart:(state, action)=>{
            state.push(action.payload)
        },
        removeFromCart:(state, action)=>{
         return state.filter((item)=> item._id !== action.payload)  
         
        }
    }
})
export const {addToCart,removeFromCart} = productSlice.actions
export default productSlice.reducer