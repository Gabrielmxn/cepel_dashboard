import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Barra } from '../../components/Barra'

import { Header } from "../../components/Header";
import { Container } from "./style";




export function Barras(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <Link to='/'>
      <FaArrowLeft color="white" size={34}/>
    </Link>
    <Container>
        <Barra /> 
   </Container>
   </>
  )
}