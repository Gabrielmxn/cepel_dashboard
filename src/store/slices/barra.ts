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
    add: (state, action) => {
      state.barras.push(action.payload)
    },
    remove: (state, action) => {
      const response = state.barras.filter(resp => resp.id !== action.payload.id)
      state.barras = response
    },
    edit: (state, action) => {
      const index = state.barras.findIndex(resp => resp.id === action.payload.id)
      state.barras[index].id = action.payload.newId
    }
  },
  extraReducers: (thunk) => {
    thunk.addCase(fetchBarras.fulfilled,  (state, action) => {
      state.barras = action.payload
      
    })
  }
})

export const barra = barraSlice.reducer
export const { add, remove, edit } = barraSlice.actions