import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter"
import msgCouner from './msgCounter'


export default configureStore({
  reducer: {
    counter: counterReducer,
    msgcounter : msgCouner,
  }
})