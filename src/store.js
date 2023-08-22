import { configureStore } from '@reduxjs/toolkit'
import prizeSlice from './store/prize'

export const store = configureStore({
  reducer: {
    prize: prizeSlice,
  },
})
