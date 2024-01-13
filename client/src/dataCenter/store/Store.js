import { configureStore } from '@reduxjs/toolkit'
import productSlice from './../slice/cartSlice'
export const store = configureStore({
  reducer: {
    cart:productSlice
  },
})