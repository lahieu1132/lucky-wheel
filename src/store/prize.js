import { createSlice } from '@reduxjs/toolkit'

export const prizeSlice = createSlice({
  name: 'prize',
  initialState: [],
  reducers: {
    setData: (state, action) => action.payload,
  },
})

export const { setData } = prizeSlice.actions

export default prizeSlice.reducer
