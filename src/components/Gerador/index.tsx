import React, {FormEvent}  from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { add } from "../../store/slices/gerador";
import { Form, FormContainer } from "./style";




import './style.css'


export function Gerador(){
  const [valueBarra, setValueBarra] = useState('')
  const [active, setActive] = useState(false)
  const inputBarra = useRef(null)
  const {gerador, storeBarra} = useAppSelector(store => {
    const gerador = store.gerador
    const storeBarra = store.barra
    return {
      gerador,
      storeBarra
    }
  })

  const dispatch = useDispatch()
 

  async function addGerador(event: FormEvent<Element>) {
    event.preventDefault()
    const response = await fetch('http://localhost:3001/gerador', {
      method: 'POST',
      body: JSON.stringify(
        {
          barra: "f371",
        }
      )
    })

    const data =  await response.json()
    
    dispatch(add(
      data
    ))
    
  }

  if(!gerador){
    return null
  }
  return(
    <section className="container-equipamentos">
  
    <div className="header-card">
      <h3>Gerador</h3>
      <button onClick={() => setActive(!active)}>Adicionar novo gerador</button>
    </div>
    <table>
      <thead>
        <th>Código</th>
        <th>gerador</th>
      </thead>
      <tbody>
        {gerador.map(response => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td>{response.gerador}</td>
          </tr>
        )}
      </tbody>
    </table>

    <FormContainer  active={active}>
      <Form onSubmit={(event: FormEvent) => addGerador(event)}>
        <input type="text" ref={inputBarra} list="data-list-barras" value={valueBarra} onChange={(event) => setValueBarra(event.target.value)}/>
        <datalist id="data-list-barras">
          {storeBarra.barras.map(resp => <option value={resp.id}></option>)}
        </datalist>
      </Form>
    </FormContainer>
  </section>

  )
}