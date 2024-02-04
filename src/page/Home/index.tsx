import React from "react";
import { Header } from "../../components/Header";
import { Button, Container } from "./style";



export function Home(){
  return(
    <>
    <Header />
    <Container>
      <Button>
  
        <span>Barras</span>
      </Button>

      <Button>

        <span>Geradores</span>
      </Button>
      <Button>
  
        <span>Transformadores</span>
      </Button>
      <Button>
  
        <span>Linhas</span>
      </Button>
    </Container>
    </>
  )
}