import React, { useEffect } from "react";
import { Barra } from '../../components/Barra'
import { Gerador } from "../../components/Gerador";

import './style.css'
import { Header } from "../../components/Header";




export function Dashboard(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <main className="container">

        <Barra /> 
        <Gerador />
      
      
      
   </main>
   </>
  )
}