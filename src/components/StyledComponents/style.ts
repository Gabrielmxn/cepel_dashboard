import { styled } from 'styled-components';
import { IoMdClose } from "react-icons/io";

export const ButtonAction = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: none;
  color: ${props => props.color};
  transition: all 100ms ease-in-out;
  cursor: pointer;
  &:hover{
    transform: scale(1.2);
  }

` 

interface FormContainerProps {
  actives: string
}
export const FormContainer = styled.section<FormContainerProps>`
${props => props.actives === 'false' ? {
    display: 'none'
  } : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',

  }};

  h2{
    color: black;
  }

`

export const Form = styled.form`
  max-width: 400px;
  width: 100%;
  position: relative;
  padding: 2rem;
  background-color: beige;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  input {
    outline: none;
    border: 1px solid rgb(0,0,0,0.4);
    padding: 0.5rem;
    width: 100%;
    margin-top: 1rem;
    border-radius: 4px;
    &:focus{
      box-shadow: 0px 0px 2px 0px black;
    }
  }

 
  
`
export const X = styled(IoMdClose)`
  position: absolute;
  font-size: 2rem;
  top: 0.5rem;
  right: 0.5rem;
  color: black;
  transition: transform 200ms ease-in;
  cursor: pointer;
  &:hover{
    transform: scale(1.5);

  }
` 

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 0.5rem 0;
  gap: 1rem;
  h3{
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p{
    font-size: 1.2rem;
  }
`
export const Info = styled.p`
  font-weight: bold;
  margin-top: 1rem;
  z-index: 999999;
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

export const Send = styled.button`

 margin: 0 auto;
  margin-top: 1rem;
  background-color: green;
  border: none;
  border-radius: 2px;
  padding: 0.5rem 1rem;
  color: white;
`
export const ContainerDiv = styled.div`
  max-width: 700px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0 auto;
`
export const Table = styled.table`
  border-collapse: collapse;
 
  border-spacing: 0;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;


  th, td {
  text-align: left;
  padding: 8px;

  }
`

export const Container = styled.main`
  width: 100%;
  padding: 0.5rem;
`

export const ContainerAction = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

`
