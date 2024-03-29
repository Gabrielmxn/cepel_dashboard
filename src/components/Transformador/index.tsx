import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ButtonAction, Form, FormContainer, Info, Send, X } from "../StyledComponents/style";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/axios";
import { TransformadorDTOS } from "../../DTOS/transformador";
import { verifyBarra } from "../../utils/verifyBarra";
import { add, edit, fetchTransformador, remove } from "../../store/slices/transformador";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { fetchBarras } from "../../store/slices/barra";
import { ButtonHeader, Container, HeaderContainer } from "./style";
import { Popup } from "../popup";


export function Transformador() {
  const [barraDe, setBarraDe] = useState('')
  const [barraPara, setBarraPara] = useState('')
  const [actionMethod, setActionMethod] = useState<'EDIT' | 'ADD'>('ADD')
  const [valueIdTransformador, setValueIdTransformador] = useState('')
  const [message, setMessage] = useState('')
  const [activePopupRender, setActivePopupRender] = useState(false)
  const [active, setActive] = useState(false)
  const dalistBarra = useRef<HTMLDataListElement>(null)


  const dispatch = useAppDispatch()
  const { linha, transformador, storeBarra, geradors } = useAppSelector(store => {
    const transformador = store.transformador.transformadores
    const storeBarra = store.barra.barras
    const geradors = store.gerador.geradores
    const linha = store.linha.linhas
    return {
      transformador,
      storeBarra,
      geradors,
      linha
    }
  })

  const Action = {
    EDIT: {
      title: 'Editar número da barra',
      function: (event: FormEvent) => editGerador(event)
    },
    ADD: {
      title: 'Adicionar transformador',
      function: (event: FormEvent) => addTransformador(event)
    }
  }



  async function editGerador(event: FormEvent) {
    event.preventDefault()
    const verifyDe = await verifyBarra({
      idBarra: barraDe,
      geradors,
      linha,
      transformador
    })

    const verifyPara = await verifyBarra({
      idBarra: barraPara,
      geradors,
      linha,
      transformador
    })

    if (verifyDe.isVerifyBarra && verifyPara.isVerifyBarra) {
      const storeB = transformador.find(resp => resp.id === valueIdTransformador)

      if (storeB) {
        await api.patch<TransformadorDTOS>(`http://localhost:3001/transformador/${valueIdTransformador}`, {
          barraDe,
          barraPara
        })

        dispatch(edit({
          id: valueIdTransformador, barraDe,
          barraPara
        }))

        setValueIdTransformador('')
        setBarraPara('')
        setBarraDe('')
        close()
        return
      }

    }
    if (!verifyDe.isVerifyBarra) {
      handleActivePopup(`Não foi possível adicionar a barra ${barraDe}`)
    } else if (!verifyPara.isVerifyBarra) {
      handleActivePopup(`Não foi possível adicionar a barra ${barraPara}`)
    } else {
      handleActivePopup('DIGITE O VALOR DA LISTA OU SELECIONA')
    }

    close()

  }
  async function removerTransformador(id: string) {
    try {
      await api.delete<TransformadorDTOS>(`http://localhost:3001/transformador/${id}`)
      dispatch(remove({ id }))
    } catch (err) {
      handleActivePopup(err.message)
    }
  }




  function handleActivePopup(message: string) {
    setMessage(message)
    setActivePopupRender(true)
    setInterval(() => {
      setActivePopupRender(false)
    }, 10000)
  }
  async function addTransformador(event: FormEvent<Element>) {
    event.preventDefault()
    if (valueIdTransformador.length === 0) {
      handleActivePopup('Digite um código')
      return
    }
    const verifyDe = await verifyBarra({
      idBarra: barraDe,
      geradors,
      linha,
      transformador
    })

    const verifyPara = await verifyBarra({
      idBarra: barraPara,
      geradors,
      linha,
      transformador
    })



    if (verifyDe.isVerifyBarra && verifyPara.isVerifyBarra) {


      const isVerify = transformador.some(resp => resp.id === valueIdTransformador)

      if (isVerify) {
        handleActivePopup('CÓGIGO DE GERADOR JÁ EXISTE')
        return
      }

      if (barraDe === barraPara) {
        handleActivePopup('Tem que ser barra diferente')
        return
      }

      const storeBarraDe = storeBarra.find(resp => resp.id === barraDe)
      const storeBarraPara = storeBarra.find(resp => resp.id === barraPara)
      if (storeBarraDe && storeBarraPara) {
        try {
          const response = await api.post('http://localhost:3001/transformador', {
            id: valueIdTransformador,
            barraDe,
            barraPara
          })


          const data = await response.data

          setValueIdTransformador('')
          dispatch(add(
            data
          ))

        } catch (error) {
          handleActivePopup(error.message)
        }
        return
      }
      handleActivePopup('DIGITE O VALOR DA LISTA OU SELECIONA')

    }
    close()
    setValueIdTransformador('')

    setBarraPara('')
    setBarraDe('')
    if (!verifyDe.isVerifyBarra) {

      handleActivePopup(`Não foi possível adicionar a barra ${barraDe}`)
    } else if (!verifyPara.isVerifyBarra) {
      handleActivePopup(`Não foi possível adicionar a barra ${barraPara}`)
    }

  }

  function handleBarra(event: ChangeEvent<HTMLInputElement>, addValue: (id: string) => void) {
    const inputValue = event.target.value;


    if (/^\d*$/.test(inputValue)) {
      addValue(event.target.value)
    }

  }


  function handleAction(action: 'EDIT' | 'ADD', id?: string, barraDe?: string, barraPara?: string) {
    setActive(!active)
    setActionMethod(action)
    if (action === 'EDIT') {
      setBarraDe(barraDe)
      setBarraPara(barraPara)
      setValueIdTransformador(id)
    }
  }

  function close() {

    setValueIdTransformador('')
    setActive(!active)
  }

  useEffect(() => {
    dispatch(fetchTransformador())
    dispatch(fetchBarras())
  }, [])
  return (
    <Container>
      {activePopupRender && <Popup message={message} />}
      <HeaderContainer>
        <div>
          <h3>Transformador</h3>
          <p>Os
            transformadores desempenham o papel de modificar os níveis de tensão, essenciais para a
            transmissão eficiente de energia ao longo de longas distâncias e para a adequação dos níveis de
            tensão para uso seguro e eficiente pelos consumidores</p>
        </div>
        <ButtonHeader onClick={() => handleAction('ADD')}>Adicionar</ButtonHeader>
      </HeaderContainer>
      {transformador.length > 0 ? <table>
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
              <ButtonAction color="green" onClick={() => handleAction('EDIT', response.id, response.barraDe, response.barraPara)}>
                <FaEdit size={24} />
              </ButtonAction>
              <ButtonAction color="green" onClick={() => removerTransformador(response.id)}>
                <IoMdTrash size={24} />
              </ButtonAction>
            </tr>
          )}
        </tbody>
      </table> : <Info>Nenhum transformador cadastrado.</Info>}

      <FormContainer actives={active.toString()}>
        <Form onSubmit={Action[actionMethod].function}>
          <button type="button" onClick={close}>
            <X />
          </button>
          <h2>{Action[actionMethod].title}</h2>
          <input type="text" disabled={actionMethod === 'EDIT'} placeholder="Digite o código do transformador" value={valueIdTransformador} onChange={(event) => handleBarra(event, setValueIdTransformador)} />
          <input type="text" list="data-list-barras" value={barraDe} placeholder="Digite o código da barrade" onChange={(event) => handleBarra(event, setBarraDe)} />
          <datalist ref={dalistBarra} id="data-list-barras">
            {storeBarra.map(resp => <option value={resp.id}></option>)}
          </datalist>
          <input type="text" list="data-list-barras-de" value={barraPara} placeholder="Digite o código da barraPara" onChange={(event) => handleBarra(event, setBarraPara)} />
          <datalist ref={dalistBarra} id="data-list-barras-de">
            {storeBarra.map(resp => <option value={resp.id}></option>)}
          </datalist>
          <Send>Enviar</Send>
        </Form>
      </FormContainer>
    </Container>
  )
}