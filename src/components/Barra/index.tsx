import React, { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { BarraDTOs } from "../../DTOS/barra";
import { useAppDispatch, useAppSelector } from "../../store";
import { add, fetchBarras, remove } from "../../store/slices/barra";
import { api } from "../../utils/axios";
import { FaEdit, FaNewspaper } from "react-icons/fa";

import { ButtonAction, ButtonSend, Container, Form, FormContainer, HeaderBarra, X } from "./style";
import { IoMdTrash } from "react-icons/io";




export function Barra(){
  const [active, setActive] = useState(false)
  const [actionMethod, setActionMethod] = useState<'EDIT' | 'ADD'>('ADD')
  const [valueBarra, setValueBarra] = useState('')
  const [indexw, setIndex] = useState('')
  const Action = {
    EDIT:{
      title: 'Editar número da barra',
      function: (event: FormEvent) => editBarra(event) 
    },
    ADD:{
      title: 'Adicionar barra',
      function: (event: FormEvent) => addBarra(event) 
    }
  }
  const store = useAppSelector(store => {

    return store.barra.barras
  })

  const dispatch = useAppDispatch()
 

  async function editBarra(event: FormEvent){
    const response = await api.put<BarraDTOs>(`http://localhost:3001/barra/${valueBarra}`)
    dispatch(edit({ valueBarra}))
  }
  async function removeBarra(id: string){
    const response = await api.delete<BarraDTOs>(`http://localhost:3001/barra/${id}`)
    dispatch(remove({ id}))
  }
  async function addBarra(event: FormEvent) {
    event.preventDefault()
    const verify = store.some(resp => resp.id === valueBarra)

    if(verify){
      console.log('CÓGIGO DE GERADOR JÁ EXISTE')
      return
    }
    const response = await api.post<BarraDTOs>(`http://localhost:3001/barra`, {
      id: valueBarra
    })

    const data =  response.data
      console.log(data)
    dispatch(add(
      data
    ))

    setValueBarra('')
    
  }
  console.log(store)
  function handleAction(action: 'EDIT' | 'ADD', id?: string, indexx?: string){
    setActive(!active)
    setActionMethod(action)
    if(action === 'EDIT'){
      setValueBarra(id)
      setIndex(indexx)
    }
  }
  useEffect(() => {
    dispatch(fetchBarras())
  }, [])

  function handleBarra(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    
    if (/^\d*$/.test(inputValue)) {
      setValueBarra(event.target.value)
    }
   
  }
  return(
    <Container>
   
      <HeaderBarra>
        <div>
          <h3>Barra</h3>
          <p>As barras, também conhecidas como nós, são pontos de conexão onde se podem conectar geradores, transformadores, linhas e cargas, funcionando como eixos centrais na rede de distribuição</p>
        </div>
        <button onClick={() => handleAction('ADD')}><FaNewspaper /> Nova barra</button>
      </HeaderBarra>
    {
      store && <table>
      <thead>
        <th>Código</th>
      </thead>
      <tbody>
        {store.map((response, index) => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td><div>
            <ButtonAction color="green" onClick={() =>  handleAction('EDIT',response.id, String(index))}>
              <FaEdit size={24} />
            </ButtonAction>
            <ButtonAction  color="red" onClick={() =>  removeBarra(response.id)}>
              <IoMdTrash size={24} />
              </ButtonAction>      
              </div></td>
          </tr>
        )}
      </tbody>
    </table>
    }
    <FormContainer active={active}>
    <Form onSubmit={Action[actionMethod].function}>
        <button type="button" onClick={() =>  setActive(!active)}>
          <X  />
        </button>
        <h2>{Action[actionMethod].title}</h2>
        <input type="text" value={valueBarra} placeholder="Digite o número da barra" onChange={handleBarra}/>
        <ButtonSend>Adicionar</ButtonSend>
      </Form>
    </FormContainer>
  </Container>

  )
}