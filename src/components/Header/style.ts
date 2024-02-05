import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
  background-color: #1E488F;
`


export const Heading = styled(Link)`
  font-size: 2rem;
  color: white;
  text-decoration: none;

`