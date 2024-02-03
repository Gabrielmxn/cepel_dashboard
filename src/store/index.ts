import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { barra } from "./slices/barra"
import { gerador } from "./slices/gerador"




export const store = configureStore({
  reducer: {
    barra,
    gerador
  },
})


export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector