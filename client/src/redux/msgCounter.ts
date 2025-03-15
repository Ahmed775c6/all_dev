import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'msgcounter',
  initialState: {
    value: 1
  },
  reducers: {
    increment101: state => {

      state.value +=1
      console.log(state)
    },
    dicriment : state =>{
        state.value = 0;
    }

  }
})

// Action creators are generated for each case reducer function
export const { increment101 , dicriment} = counterSlice.actions

export default counterSlice.reducer