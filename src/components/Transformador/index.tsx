import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ButtonAction, Form, FormContainer, X } from "../StyledComponents/style";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/axios";
import { TransformadorDTOS } from "../../DTOS/transformador";
import { verifyBarra } from "../../utils/verifyBarra";
import { add, fetchTransformador, remove } from "../../store/slices/transformador";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { fetchBarras } from "../../store/slices/barra";
import { ButtonHeader, Container, HeaderContainer } from "./style";


export function Transformador(){
  const [valueBarra, setValueBarra] = useState('')
  const [barraDe, setBarraDe] = useState('')
  const [barraPara, setBarraPara] = useState('')
  const [actionMethod, setActionMethod] = useState<'EDIT' | 'ADD'>('ADD')
  const [valeuIdGerador, setValueIdGerador] = useState('')
  const [active, setActive] = useState(false)
  const dalistBarra = useRef<HTMLDataListElement>(null)


  const dispatch = useAppDispatch()
  const { transformador , storeBarra, geradors} = useAppSelector(store => {
    const transformador = store.transformador.transformadores
    const storeBarra = store.barra.barras
    const geradors = store.gerador.geradores
    return {
      transformador,
      storeBarra,
      geradors
    }
  })

  const Action = {
    EDIT:{
      title: 'Editar número da barra',
      function: (event: FormEvent) => editGerador(event) 
    },
    ADD:{
      title: 'Adicionar transformador',
      function: (event: FormEvent) => addTransformador(event) 
    }
  }
  


  async function editGerador(event: FormEvent){
    event.preventDefault()

    const storeB = storeBarra.find(resp => resp.id === valueBarra)

    if(storeB){
      const response = await api.patch<TransformadorDTOS>(`http://localhost:3001/gerador/${valeuIdGerador}`, {
        barraId: valueBarra
      })
      console.log(response.data)
      //dispatch(edit({ id: valeuIdGerador, barraId: valueBarra}))
      setValueBarra('')

      return
    }
    console.log('DIGITE O VALOR DA LISTA OU SELECIONA')
  }
  async function removerTransformador(id: string){
   try{
    const response = await api.delete<TransformadorDTOS>(`http://localhost:3001/transformador/${id}`)
    dispatch(remove({ id}))
   }catch(err){
    console.log(err)
   }
  }



 

  async function addTransformador(event: FormEvent<Element>) {
    event.preventDefault()
 
    const verifyDe =  await verifyBarra({
      idBarra: barraDe,
      geradors,
      linha: [],
      transformador
    })

    const verifyPara =  await verifyBarra({
      idBarra: barraPara,
      geradors,
      linha: [],
      transformador
    })


    
   if(verifyDe.isVerifyBarra && verifyPara.isVerifyBarra){
    console.log('verifyDe.isVerifyBarra', verifyDe.isVerifyBarra)
    console.log('verifyPara.isVerifyBarra', verifyPara.isVerifyBarra)

    const isVerify = geradors.some(resp => resp.id === valeuIdGerador)

    if(isVerify){
      console.log('CÓGIGO DE GERADOR JÁ EXISTE')
      return
    }

    if(barraDe === barraPara){
      console.log('Tem que ser barra diferente')
      return
    }

    const storeBarraDe = storeBarra.find(resp => resp.id === barraDe)
    const storeBarraPara = storeBarra.find(resp => resp.id === barraPara)
    if(storeBarraDe && storeBarraPara){
      try {
        const response = await api.post('http://localhost:3001/transformador', {
          id: valeuIdGerador,
          barraDe,
          barraPara
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
    console.log('DIGITE O VALOR DA LISTA OU SELECIONA')
  }
  setValueIdGerador('')
  setValueBarra('')
  if(!verifyDe){
    console.log('Não foi possível adicionar a barra', barraDe)
  }else if(!verifyPara){
    console.log('Não foi possível adicionar a barra', barraPara)
  }
  }

  function handleBarra(event: ChangeEvent<HTMLInputElement>, addValue: (id: string) => void) {
    const inputValue = event.target.value;

    
    if (/^\d*$/.test(inputValue)) {
      addValue(event.target.value)
    }
   
  }


  function handleAction(action: 'EDIT' | 'ADD', id?: string, indexx?: string){
    setActive(!active)
    setActionMethod(action)
    if(action === 'EDIT'){
      setValueBarra(indexx)
      console.log("valores")
      console.log(id)
      setValueIdGerador(id)
    }
  }

  function close(){
    setValueBarra('')
    setValueIdGerador('')
    setActive(!active)
  }

  useEffect(() => {
    dispatch(fetchTransformador())
    dispatch(fetchBarras())
  }, [])
  return(
    <Container>
  
    <HeaderContainer>
        <div>
          <h3>Transformador</h3>
          <p>Os
transformadores desempenham o papel de modificar os níveis de tensão, essenciais para a
transmissão eficiente de energia ao longo de longas distâncias e para a adequação dos níveis de
tensão para uso seguro e eficiente pelos consumidores</p>
        </div>
      <ButtonHeader onClick={() =>  handleAction('ADD')}>Adicionar novo gerador</ButtonHeader>
    </HeaderContainer>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>BarraDe</th>
          <th>BarraPara</th>
        </tr>
      </thead>
      <tbody>
        {transformador.map((response, index) => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td>{response.barraDe}</td>
            <td>{response.barraPara}</td>
            <ButtonAction color="green" onClick={() =>  removerTransformador(response.id)}>
              <FaEdit size={24} />
            </ButtonAction>
            <ButtonAction color="green" onClick={() =>  removerTransformador(response.id)}>
              <IoMdTrash size={24} />
            </ButtonAction>
          </tr>
        )}
      </tbody>
    </table>

    <FormContainer  actives={active.toString()}>
      <Form onSubmit={Action[actionMethod].function}>
        <button type="button" onClick={close}>
        <X  />
        </button>
        <h2>{Action[actionMethod].title}</h2>
        <input type="text" disabled={actionMethod == 'EDIT'} placeholder="Digite o código do gerador" value={valeuIdGerador} onChange={(event) => handleBarra(event, setValueIdGerador)}/>
        <input type="text" list="data-list-barras" value={barraDe} onChange={(event) => handleBarra(event, setBarraDe)}/>
        <datalist ref={dalistBarra} id="data-list-barras">
          {storeBarra.map(resp => <option value={resp.id}></option>)}
        </datalist>
        <input type="text" list="data-list-barras-de" value={barraPara} onChange={(event) => handleBarra(event, setBarraPara)}/>
        <datalist ref={dalistBarra} id="data-list-barras-de">
          {storeBarra.map(resp => <option value={resp.id}></option>)}
        </datalist>
        <button>Enviar</button>
      </Form>
    </FormContainer>
  </Container>
  )
}