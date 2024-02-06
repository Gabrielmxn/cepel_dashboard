import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BarraDTOs } from "../../DTOS/barra";
import { useAppDispatch, useAppSelector } from "../../store";
import { add, fetchBarras, remove } from "../../store/slices/barra";
import { api } from "../../utils/axios";

import { ButtonAction, ButtonSend, X } from "./style";
import { IoMdTrash } from "react-icons/io";
import { ButtonHeader, Form, FormContainer, HeaderContainer, Info, Container, Table, ContainerDiv } from "../StyledComponents/style";
import { Popup } from "../popup";




export function Barra(){
  const [active, setActive] = useState(false)
  const [actionMethod, setActionMethod] = useState<'ADD'>('ADD')
  const [valueBarra, setValueBarra] = useState('')
  const [message, setMessage] = useState('')
  const [activePopupRender, setActivePopupRender] = useState(false)
  const Action = {
    ADD:{
      title: 'Adicionar barra',
      function: (event: FormEvent) => addBarra(event) 
    }
  }
  const { barra, gerador, transformador, linha } = useAppSelector(store => {
    const transformador = store.transformador.transformadores
    const gerador = store.gerador.geradores
    const barra = store.barra.barras
    const linha = store.linha.linhas
    return {
      transformador,
      gerador,
      barra,
      linha
    }

  })

  const dispatch = useAppDispatch()
 

  
  async function removeBarra(id: string){
    const response = await api.delete<BarraDTOs>(`http://localhost:3001/barra/${id}`)
    dispatch(remove({ id}))
  }
  async function addBarra(event: FormEvent) {
    event.preventDefault()
    const verify = barra.some(resp => resp.id === valueBarra)
    if(valueBarra.length === 0){
      handleActivePopup('O valor não pode ser nulo')
      return
    }
    if(verify){
      handleActivePopup('CÓGIGO DE GERADOR JÁ EXISTE')
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
    setActive(false)
    setValueBarra('')
    
  }
  console.log(barra)
  function handleAction(action:'ADD', id?: string, indexx?: string){
    setActive(!active)
    setActionMethod(action)
  }
  function handleActivePopup(message: string){
    setMessage(message)
    setActivePopupRender(true)
    setInterval(() => {
      setActivePopupRender(false)
    }, 10000)
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
    {activePopupRender && <Popup message={message}/>}
      <HeaderContainer>
        <div>
          <h3>Barra</h3>
          <p>As barras, também conhecidas como nós, são pontos de conexão onde se podem conectar geradores, transformadores, linhas e cargas, funcionando como eixos centrais na rede de distribuição</p>
        </div>
        <ButtonHeader onClick={() => handleAction('ADD')}>Adicionar</ButtonHeader>
      </HeaderContainer>
    {
      barra.length > 0 ? <ContainerDiv><Table>
      <thead>
        <tr>
          <th>Código</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {barra.map((response, index) => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td><div>
            
            <ButtonAction  color="red" onClick={() =>  removeBarra(response.id)}>
              <IoMdTrash size={24} />
              </ButtonAction>      
              </div></td>
          </tr>
        )}
      </tbody>
    </Table></ContainerDiv>
    : <Info>Nenhuma barra cadastrada.</Info>
    }
    <FormContainer actives={active.toString()}>
    <Form onSubmit={Action[actionMethod].function}>
        <button type="button" onClick={() =>  setActive(!active)}>
          <X  />
        </button>
        <h2>{Action[actionMethod].title}</h2>
        <input type="text" value={valueBarra}  placeholder="Digite o número da barra" onChange={handleBarra}/>
        <ButtonSend>Adicionar</ButtonSend>
      </Form>
    </FormContainer>
  </Container>

  )
}