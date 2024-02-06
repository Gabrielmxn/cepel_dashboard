import styled from "styled-components";


export const Container = styled.div`
  max-width: 800px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;

  @media (max-width: 768px){
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  padding: 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  background-color: #1E488F;
  border-radius: 4px;

  margin-top: 2rem;

`