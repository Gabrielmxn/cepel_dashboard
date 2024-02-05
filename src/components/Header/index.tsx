import React from "react"
import { HeaderContainer, Heading } from './style'
import { Link, Router } from "react-router-dom"

export function Header(){
  return(
    <HeaderContainer >
      <Heading to={'/'}>
        <h2>CEPEL</h2>
      </Heading>
    </HeaderContainer>
  )
}