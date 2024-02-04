import { styled } from 'styled-components';
import { IoMdClose } from "react-icons/io";
interface FormContainerProps {
  active: boolean
}


export const FormContainer = styled.section<FormContainerProps>`
${props => !props.active ? {
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

`

export const Form = styled.form`
  position: relative;
  padding: 4rem;
  background-color: beige;
  
  
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