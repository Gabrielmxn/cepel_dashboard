import React from "react";
import { Header } from "../../components/Header";
import { Button, Container } from "./style";



export function Home(){
  return(
    <>
    <Header />
    <Container>
      <Button to="/barras" area="barra">
  
        <span>Barras</span>
      </Button>

      <Button to="/geradores" area="gerador">

        <span>Geradores</span>
      </Button>
      <Button to="/transformadores" area="transformador">
  
        <span>Transformadores</span>
      </Button>
      <Button to="/linhas" area="linha">
  
        <span>Linhas</span>
      </Button>
      <Button to="/dashboard" area="dashboard">
  
  Dashboard
</Button>
    </Container>
    </>
  )
}