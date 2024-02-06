import React from "react";
import { Transformador } from "../../components/Transformador";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


export function TransformadorPage(){
  return(
    <>
      <Header />
      <Link to='/'>
        <FaArrowLeft color="white" size={34}/>
      </Link>
      <Transformador />
    </>
  )
}