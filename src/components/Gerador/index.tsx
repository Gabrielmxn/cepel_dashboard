import React, {FormEvent, InputHTMLAttributes}  from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { add } from "../../store/slices/gerador";
import { Form, FormContainer, X } from "./style";
import { IoMdClose } from "react-icons/io";




import './style.css'
import { verifyBarra } from "../../utils/verifyBarra";


export function Gerador(){
  const [valueBarra, setValueBarra] = useState('')
  const [active, setActive] = useState(false)
  const dalistBarra = useRef<HTMLDataListElement>(null)

  const {gerador, storeBarra} = useAppSelector(store => {
    const gerador = store.gerador
    const storeBarra = store.barra.barras

    return {
      gerador,
      storeBarra,
       
    }
  })

  const dispatch = useDispatch()
 

  async function addGerador(event: FormEvent<Element>) {
    event.preventDefault()
 
    const verify =  await verifyBarra({
      idBarra: valueBarra,
      gerador,
      linha: [],
      transformador: []
    })

    
   if(verify.isVerifyBarra){

 
    const storeB = storeBarra.find(resp => resp.id === valueBarra)
    if(storeB){
      try {
        const response = await fetch('http://localhost:3001/gerador', {
        method: 'POST',
        body: JSON.stringify(
          {
            barraId: valueBarra,
          }
        )
      })
      
  
      const data =  await response.json()
      setValueBarra('')
      dispatch(add(
        data
      ))
    
      }catch(error){
        console.log(error)
      }
      return
    }
    console.log('DIGITE O VALOR DA LISTA OU SELECIONA')
  }
  setValueBarra('')
  console.log('Não foi possível adicionar a barra')
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
        <th>BarraId</th>
      </thead>
      <tbody>
        {gerador.map(response => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td>{response.barraId}</td>
          </tr>
        )}
      </tbody>
    </table>

    <FormContainer  active={active}>
      <Form onSubmit={(event: FormEvent) => addGerador(event)}>
        <button type="button" onClick={() =>  setActive(!active)}>
        <X  />
        </button>
        <input type="text" list="data-list-barras" value={valueBarra} onChange={(event) => setValueBarra(event.target.value)}/>
        <datalist ref={dalistBarra} id="data-list-barras">
          {storeBarra.map(resp => <option value={resp.id}></option>)}
        </datalist>
        <button>Enviar</button>
      </Form>
    </FormContainer>
  </section>

  )
}