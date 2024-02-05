import React, { useEffect } from "react";

import './style.css'
import { Header } from "../../components/Header";
import { Dashboard } from "../../components/Dashboard";




export function DashboardPage(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <main className="container">

       <Dashboard />
      
      
      
   </main>
   </>
  )
}