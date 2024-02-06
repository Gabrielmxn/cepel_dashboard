import React from "react";
import { Container } from "./style";

interface PopupProps{
  message: string
}
export function Popup({message}: PopupProps){
  return(
    <Container>
      <p>{message}</p>
    </Container>
  )
}