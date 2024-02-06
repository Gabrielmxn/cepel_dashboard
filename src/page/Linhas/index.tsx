import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Linha } from "../../components/Linha";



export function LinhaPage(){
  return(
    <>
    <Header />
    <Link to='/'>
      <FaArrowLeft color="white" size={34}/>
    </Link>
    <Linha />
    </>
  )
}