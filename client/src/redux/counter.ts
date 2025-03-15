import { createSlice } from '@reduxjs/toolkit'
const len = JSON.parse(localStorage.getItem("cart") || '[]')?.length || 0
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: len
  },
  reducers: {
    increment: state => {

      state.value = JSON.parse(localStorage.getItem("cart") || '[]')?.length 
    },

  }
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions

export default counterSlice.reducer