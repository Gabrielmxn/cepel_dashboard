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
  input {
    outline: none;
    padding: 0.5rem;
    width: 100%;
    margin-top: 2rem;
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