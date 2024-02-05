import React from "react";
import { Link } from "react-router-dom";
import styled, { WebTarget } from "styled-components";

export const Container = styled.main`
  display: grid;
  max-width: 800px;
  width: 100%;
  padding: 0.5rem;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 
  "barra gerador"
  "transformador linha"
  "dashboard dashboard"
  ;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin-top: 2rem;

`
interface ButtonProps{
  area: string
}
export const Button = styled(Link)<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  background-color: green;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  grid-area: ${props => props.area};
` 