import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';

export const fetchGerador = createAsyncThunk(
  'start',
  async () => {
    const response = await api.get('/gerador')
    return response.data
  }
)

interface GeradorState {
  geradores: Array<
    {
      id: string
      barraId: string
    }
  >
}

const initialState: GeradorState = {
  geradores: []
}

const geradorSlice = createSlice({
  name: 'Gerador',
  initialState,
  reducers: {
    start: (state, action) => {
      console.log('o que e', action.payload)
    },
    add: (state, action) => {
      console.log(state, action)
      state.geradores.push(action.payload)
    },
    remove: (state, action) => {
      const response = state.geradores.filter(resp => resp.id !== action.payload.id)
      state.geradores = response
    },
    edit: (state, action) => {
      const index = state.geradores.findIndex(resp => resp.id === action.payload.id)
      state.geradores[index].barraId = action.payload.barraId
    },
  },
  extraReducers: (thunk) => {
    thunk.addCase(fetchGerador.fulfilled,  (state, action) => {
      // Add user to the state arra
      console.log('que isso 2', action.payload)
      state.geradores = action.payload
    })
  }
})

export const gerador = geradorSlice.reducer
export const { add, remove, edit, } = geradorSlice.actions