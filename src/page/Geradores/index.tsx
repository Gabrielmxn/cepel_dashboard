import React, { useEffect } from "react";

import { Header } from "../../components/Header";
import { Container } from "./style";
import { Gerador } from "../../components/Gerador";




export function GeradorPage(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <Container>
        <Gerador /> 
   </Container>
   </>
  )
}