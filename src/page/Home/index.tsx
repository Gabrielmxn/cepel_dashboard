import React, { useEffect } from "react";
import { Barra } from '../../components/Barra'
import { Gerador } from "../../components/Gerador";

import './style.css'




export function Home(){


  useEffect(() => {
    
  }, [])
  return(
    <main className="container">

        <Barra /> 
        <Gerador />
      
      
      
   </main>
  )
}