import { createSlice } from '@reduxjs/toolkit'




export const productSlice =createSlice({
    name:'productSlice',
    initialState:{
        cart:[],
        checkout:{
            userId:'',
            userOrderList:[],
        }
    },
    reducers:{
        addToCart:(state, action)=>{
            // state.cart.push(action.payload)
            return {
                ...state,
                cart: [...state.cart, action.payload]
              }
        },
        removeFromCart:(state, action)=>{
       
            // if you are working purely with an array with initial stage you can use this
        //  return state.cart.filter((item, index)=> index !== action.payload)  

        // if you working with object and inside that there is an array
        return {
            ...state,
            cart: state.cart.filter((item, index)=> index !== action.payload)
          }
        
         
        },
        addDeliveryAddress:(state, action)=>{
            // state.checkout.deliveryAddress = action.payload
            state.checkout.userOrderList = state.cart.map(item => ({
                product: item._id,                
                quantity:1,
                paymentStatus:"pending",
                deliveryAddress: action.payload
              }))
        }

    }
})
export const {addToCart,removeFromCart , addDeliveryAddress} = productSlice.actions
export default productSlice.reducer