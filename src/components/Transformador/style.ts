import styled from "styled-components";


export const Container = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  h3{
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p{
    font-size: 1.2rem;
  }
`

export const ButtonHeader = styled.button`
  padding: 4px 8px;
  color: white;
  background-color: green;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
`