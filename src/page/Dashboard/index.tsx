import React, { useEffect } from "react";
import { Header } from "../../components/Header";
import { Dashboard } from "../../components/Dashboard";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";




export function DashboardPage(){


  useEffect(() => {
    
  }, [])
  return(
   <>
    <Header />
    <Link to='/'>
      <FaArrowLeft color="white" size={34}/>
    </Link>
    <main className="container">
    
       <Dashboard />
      
      
      
   </main>
   </>
  )
}