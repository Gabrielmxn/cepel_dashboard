import { TransformadorDTOS } from './../../DTOS/transformador.d';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';

export const fetchTransformador = createAsyncThunk(
  'start:transformador',
  async () => {
    const response = await api.get('/transformador')
    return response.data
  }
)

interface TransformadorState {
  transformadores: TransformadorDTOS[]
}

const initialState: TransformadorState = {
  transformadores: []
}

const transformadorSlice = createSlice({
  name: 'Transformador',
  initialState,
  reducers: {
    start: (state, action) => {
      console.log('o que e', action.payload)
    },
    add: (state, action) => {
      console.log(state, action)
      state.transformadores.push(action.payload)
    },
    remove: (state, action) => {
      const response = state.transformadores.filter(resp => resp.id !== action.payload.id)
      state.transformadores = response
    },
    edit: (state, action) => {
      const index = state.transformadores.findIndex(resp => resp.id === action.payload.id)
      state.transformadores[index].barraDe = action.payload.barraDe
      state.transformadores[index].barraPara = action.payload.barraPara
    },
  },
  extraReducers: (thunk) => {
    thunk.addCase(fetchTransformador.fulfilled,  (state, action) => {
      // Add user to the state arra
      console.log('que isso 2', action.payload)
      state.transformadores = action.payload
    })
  }
})

export const transformador = transformadorSlice.reducer
export const { add, remove, edit, } = transformadorSlice.actions