import { createSlice } from '@reduxjs/toolkit';


const geradorSlice = createSlice({
  name: 'Gerador',
  initialState: [],
  reducers: {
    add: (state, action) => {
      console.log(state, action)
      state.push(action.payload)
    }
  },
})

export const gerador = geradorSlice.reducer
export const { add } = geradorSlice.actions