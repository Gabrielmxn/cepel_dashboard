import React, {ChangeEvent, FormEvent, useEffect}  from "react";
import { useRef } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { add, edit, fetchGerador, remove } from "../../store/slices/gerador";
import { verifyBarra } from "../../utils/verifyBarra";
import { IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { api } from "../../utils/axios";
import { fetchBarras } from "../../store/slices/barra";
import { GeradorDTOs } from "../../DTOS/gerador";
import { fetchTransformador } from "../../store/slices/transformador";
import { ButtonAction, ButtonHeader, Container, ContainerAction, ContainerDiv, Form, FormContainer, HeaderContainer, Info, Send, Table, X } from "../StyledComponents/style";
import { Popup } from "../popup";


export function Gerador(){
  const [valueBarra, setValueBarra] = useState('')
  const [actionMethod, setActionMethod] = useState<'EDIT' | 'ADD'>('ADD')
  const [message, setMessage] = useState('')
  const [activePopupRender, setActivePopupRender] = useState(false)
  const [valeuIdGerador, setValueIdGerador] = useState('')
  const [active, setActive] = useState(false)
  const dalistBarra = useRef<HTMLDataListElement>(null)

  const Action = {
    EDIT:{
      title: 'Editar número da barra',
      function: (event: FormEvent) => editGerador(event) 
    },
    ADD:{
      title: 'Adicionar barra',
      function: (event: FormEvent) => addGerador(event) 
    }
  }
  
  const {geradors, storeBarra, transformador, linha} = useAppSelector(store => {
    const linha = store.linha.linhas
    const geradors = store.gerador.geradores
    const storeBarra = store.barra.barras
    const transformador = store.transformador.transformadores
    return {
      geradors,
      storeBarra,
      transformador,
      linha
    }
  })

  async function editGerador(event: FormEvent){
    event.preventDefault()

    const storeB = storeBarra.find(resp => resp.id === valueBarra)

    if(storeB){
      const response = await api.patch<GeradorDTOs>(`http://localhost:3001/gerador/${valeuIdGerador}`, {
        barraId: valueBarra
      })
      dispatch(edit({ id: valeuIdGerador, barraId: valueBarra}))
      setValueBarra('')

      return
    }
    
    handleActivePopup('DIGITE O VALOR DA LISTA OU SELECIONA')
  }
  async function removeGerador(id: string){
    const response = await api.delete<GeradorDTOs>(`http://localhost:3001/gerador/${id}`)
    dispatch(remove({ id}))
  }


  const dispatch = useAppDispatch()
 

  async function addGerador(event: FormEvent<Element>) {
    event.preventDefault()
 
    const verify =  await verifyBarra({
      idBarra: valueBarra,
      geradors,
      linha,
      transformador
    })

    
   if(verify.isVerifyBarra){

    const isVerify = geradors.some(resp => resp.id === valeuIdGerador)

    if(isVerify){
      handleActivePopup('O código do gerador já existe.')
      return
    }

    const storeB = storeBarra.find(resp => resp.id === valueBarra)
    if(storeB){
      try {
        const response = await api.post('http://localhost:3001/gerador', {
          id: valeuIdGerador,
          barraId: valueBarra,
      })
      
  
      const data =  await response.data
      setValueBarra('')
      setValueIdGerador('')
      dispatch(add(
        data
      ))
        console.log(data)
      }catch(error){
        console.log(error)
      }
      return
    }
    handleActivePopup('DIGITE O VALOR DA LISTA OU SELECIONA')
  }
  setValueIdGerador('')
  setValueBarra('')
  handleActivePopup('Não foi possível adicionar a barra')
  }

  function handleActivePopup(message: string){
    setMessage(message)
    setActivePopupRender(true)
    setInterval(() => {
      setActivePopupRender(false)
    }, 10000)
  }
  function handleBarra(event: ChangeEvent<HTMLInputElement>, addValue: (id: string) => void) {
    const inputValue = event.target.value;

    
    if (/^\d*$/.test(inputValue)) {
      addValue(event.target.value)
    }
   
  }

  useEffect(() => {
    dispatch(fetchBarras())
    dispatch(fetchGerador())
    dispatch(fetchTransformador())
  }, [])

  
  function handleAction(action: 'EDIT' | 'ADD', id?: string, indexx?: string){
    setActive(!active)
    setActionMethod(action)
    if(action === 'EDIT'){
      setValueBarra(indexx)
      setValueIdGerador(id)
    }
  }

  function close(){
    setValueBarra('')
    setValueIdGerador('')
    setActive(!active)
  }
  if(!geradors){
    return null
  }


 
  return(
    <Container className="container-equipamentos">
      {activePopupRender && <Popup message={message}/>}
    <HeaderContainer >
        <div>
          <h3>Gerador</h3>
          <p>As barras, também conhecidas como nós, são pontos de conexão onde se podem conectar geradores, transformadores, linhas e cargas, funcionando como eixos centrais na rede de distribuição</p>
        </div>
      <ButtonHeader onClick={() =>  handleAction('ADD')}>Adicionar</ButtonHeader>
    </HeaderContainer>
   {geradors.length > 0 ? <ContainerDiv><Table>
      <thead>
        <tr>
          <th>Código</th>
          <th>BarraId</th>
        </tr>
      </thead>
      <tbody>
        {geradors.map((response, index) => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td>{response.barraId}</td>
             <td> <ContainerAction>
             <ButtonAction color="green" onClick={() =>  handleAction('EDIT',response.id, String(response.barraId))}>
              <FaEdit size={24} />
            </ButtonAction>
            <ButtonAction  color="red" onClick={() => removeGerador(response.id)}>
              <IoMdTrash size={24} />
              </ButtonAction>   
              </ContainerAction>  </td> 
          </tr>
        )}
      </tbody>
    </Table></ContainerDiv> : <Info>Nenhum gerador cadastrado.</Info>}

    <FormContainer  actives={active.toString()}>
      <Form onSubmit={Action[actionMethod].function}>
        <button type="button" onClick={close}>
        <X  />
        </button>
        <h2>{Action[actionMethod].title}</h2>
        <input type="text" disabled={actionMethod === 'EDIT'} placeholder="Digite o código do gerador" value={valeuIdGerador} onChange={(event) => handleBarra(event, setValueIdGerador)}/>
        <input type="text" list="data-list-barras" value={valueBarra} placeholder="Digite o código da barra" onChange={(event) => handleBarra(event, setValueBarra)}/>
        <datalist ref={dalistBarra} id="data-list-barras">
          {storeBarra.map(resp => <option value={resp.id}></option>)}
        </datalist>
        <Send>Enviar</Send>
      </Form>
    </FormContainer>
  </Container>

  )
}