import { createSlice } from '@reduxjs/toolkit';

interface BarraState {
  barras: Array<
    {
      id: string
    }
  >
}

const initialState: BarraState = {
  barras: []
}

const barraSlice = createSlice({
  name: 'Barra',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(state, action)
      state.barras.push(action.payload)
    },
    remove: (state, action) => {
      const response = state.barras.filter(resp => resp.id !== action.payload.id)
      state.barras = response
    }
  },
})

export const barra = barraSlice.reducer
export const { add, remove } = barraSlice.actions