import React, { useEffect } from "react";
import { Header } from './components/Header/index'
import { Home } from './page/Home/index'

export function App() {

  async function getBarras(){
    const response = await fetch('http://localhost:3001/barra', {
      method: 'POST',
    })

    const barras = await response.json()

    console.log(barras)
  }

  useEffect(() => {
    getBarras()
  }, [])
  return (
    <>
      <Header />
      <Home />
    </>
    
   
  );
}


