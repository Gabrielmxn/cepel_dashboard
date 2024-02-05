import { transformador } from './slices/transformador';
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { barra } from "./slices/barra"
import { gerador } from "./slices/gerador"




export const store = configureStore({
  reducer: {
    barra,
    gerador,
    transformador
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch