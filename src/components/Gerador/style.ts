import { styled } from 'styled-components';

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
    backgroundColor: 'black',
  }};

`

export const Form = styled.form`
  padding: 4;
  background-color: beige;
  
  
`