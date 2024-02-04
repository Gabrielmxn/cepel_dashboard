import React, { useEffect } from "react";
import { Barra } from '../../components/Barra'

import { Header } from "../../components/Header";
import { Container } from "./style";




export function Barras(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <Container>
        <Barra /> 
   </Container>
   </>
  )
}