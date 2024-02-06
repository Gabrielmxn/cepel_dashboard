import React, { useEffect } from "react";

import { Header } from "../../components/Header";
import { Container } from "./style";
import { Gerador } from "../../components/Gerador";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";




export function GeradorPage(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <Link to='/'>
      <FaArrowLeft color="white" size={34}/>
    </Link>
    <Container>
        <Gerador /> 
   </Container>
   </>
  )
}