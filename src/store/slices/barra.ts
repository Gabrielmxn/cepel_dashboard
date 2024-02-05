import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';


export const fetchBarras = createAsyncThunk(
  'start:barra',
  async () => {
    const response = await api.get('/barra')
    return response.data
  }
)

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
    start: (state, action) => {
      console.log('o que e', action.payload)
    },
    add: (state, action) => {
      console.log(state, action)
      state.barras.push(action.payload)
    },
    remove: (state, action) => {
      const response = state.barras.filter(resp => resp.id !== action.payload.id)
      state.barras = response
    },
    edit: (state, action) => {
      const index = state.barras.findIndex(resp => resp.id === action.payload.id)
      console.log(action.payload.newId)
      state.barras[index].id = action.payload.newId
    }
  },
  extraReducers: (thunk) => {
    thunk.addCase(fetchBarras.fulfilled,  (state, action) => {
      // Add user to the state arra
      console.log('que isso', action.payload)
      state.barras = action.payload
      
    })
  }
})

export const barra = barraSlice.reducer
export const { add, remove, edit } = barraSlice.actions