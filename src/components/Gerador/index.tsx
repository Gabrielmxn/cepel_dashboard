import React, {ChangeEvent, FormEvent, useEffect}  from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store";
import { add, edit, fetchGerador, remove } from "../../store/slices/gerador";
import { Form, FormContainer, X, ButtonAction} from "./style";





import './style.css'
import { verifyBarra } from "../../utils/verifyBarra";
import { IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { api } from "../../utils/axios";
import { fetchBarras } from "../../store/slices/barra";
import { GeradorDTOs } from "../../DTOS/gerador";
import { fetchTransformador } from "../../store/slices/transformador";


export function Gerador(){
  const [valueBarra, setValueBarra] = useState('')
  const [actionMethod, setActionMethod] = useState<'EDIT' | 'ADD'>('ADD')
  const [inputAntigo, setInputAntigo] = useState('')
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
  
  const {geradors, storeBarra, transformador} = useAppSelector(store => {
    console.log(store)
    const geradors = store.gerador.geradores
    const storeBarra = store.barra.barras
    const transformador = store.transformador.transformadores
    return {
      geradors,
      storeBarra,
      transformador
    }
  })

  async function editGerador(event: FormEvent){
    event.preventDefault()

    const storeB = storeBarra.find(resp => resp.id === valueBarra)

    if(storeB){
      const response = await api.patch<GeradorDTOs>(`http://localhost:3001/gerador/${valeuIdGerador}`, {
        barraId: valueBarra
      })
      console.log(response.data)
      dispatch(edit({ id: valeuIdGerador, barraId: valueBarra}))
      setValueBarra('')

      return
    }
    console.log('DIGITE O VALOR DA LISTA OU SELECIONA')
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
      linha: [],
      transformador
    })

    
   if(verify.isVerifyBarra){

    const isVerify = geradors.some(resp => resp.id === valeuIdGerador)

    if(isVerify){
      console.log('CÓGIGO DE GERADOR JÁ EXISTE')
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
    console.log('DIGITE O VALOR DA LISTA OU SELECIONA')
  }
  setValueIdGerador('')
  setValueBarra('')
  console.log('Não foi possível adicionar a barra')
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
  if(!geradors){
    return null
  }


 
  return(
    <section className="container-equipamentos">
  
    <div className="header-card">
        <div>
          <h3>Gerador</h3>
          <p>As barras, também conhecidas como nós, são pontos de conexão onde se podem conectar geradores, transformadores, linhas e cargas, funcionando como eixos centrais na rede de distribuição</p>
        </div>
      <button onClick={() =>  handleAction('ADD')}>Adicionar novo gerador</button>
    </div>
    <table>
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
             <td> <ButtonAction color="green" onClick={() =>  handleAction('EDIT',response.id, String(response.barraId))}>
              <FaEdit size={24} />
            </ButtonAction>
            <ButtonAction  color="red" onClick={() => removeGerador(response.id)}>
              <IoMdTrash size={24} />
              </ButtonAction>     </td> 
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
        <input type="text" list="data-list-barras" value={valueBarra} onChange={(event) => handleBarra(event, setValueBarra)}/>
        <datalist ref={dalistBarra} id="data-list-barras">
          {storeBarra.map(resp => <option value={resp.id}></option>)}
        </datalist>
        <button>Enviar</button>
      </Form>
    </FormContainer>
  </section>

  )
}