import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/axios';


export const fetchLinhas = createAsyncThunk(
  'start:linha',
  async () => {
    const response = await api.get('/linha')
    return response.data
  }
)

interface LinhaState {
  linhas: Array<
    {
      id: string
      barraDe: string
	    barraPara: string
    }
  >
}

const initialState: LinhaState = {
  linhas: []
}

const linhasState = createSlice({
  name: 'Linha',
  initialState,
  reducers: {
    add: (state, action) => {
      state.linhas.push(action.payload)
    },
    remove: (state, action) => {
      const response = state.linhas.filter(resp => resp.id !== action.payload.id)
      state.linhas = response
    },
    edit: (state, action) => {
      const index = state.linhas.findIndex(resp => resp.id === action.payload.id)
      state.linhas[index].barraDe = action.payload.barraDe
      state.linhas[index].barraPara = action.payload.barraPara
    }
  },
  extraReducers: (thunk) => {
    thunk.addCase(fetchLinhas.fulfilled,  (state, action) => {
      state.linhas = action.payload
      
    })
  }
})

export const linha = linhasState.reducer
export const { add, remove, edit } = linhasState.actions