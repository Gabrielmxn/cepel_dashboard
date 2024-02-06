import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ButtonAction, ButtonHeader, ContainerDiv, Form, FormContainer, HeaderContainer, Info, Send, Table, X } from "../StyledComponents/style";
import { useAppDispatch, useAppSelector } from "../../store";
import { api } from "../../utils/axios";
import { TransformadorDTOS } from "../../DTOS/transformador";
import { verifyBarra } from "../../utils/verifyBarra";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { fetchBarras } from "../../store/slices/barra";
import { Popup } from "../popup";
import { Container } from "../Transformador/style";
import { LinhasDTOs } from "../../DTOS/linha";
import { add, edit, fetchLinhas, remove } from "../../store/slices/linha";
import { fetchTransformador } from "../../store/slices/transformador";


export function Linha() {
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
      title: 'Editar linha',
      function: (event: FormEvent) => editLinhas(event)
    },
    ADD: {
      title: 'Adicionar linha',
      function: (event: FormEvent) => addLinhas(event)
    }
  }



  async function editLinhas(event: FormEvent) {
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
      const storeB = linha.find(resp => resp.id === valueIdTransformador)
      if (barraDe === barraPara) {
        handleActivePopup('Tem que ser barra diferente')
        return
      }

      if (storeB) {
        await api.patch<LinhasDTOs>(`http://localhost:3001/linha/${valueIdTransformador}`, {
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

  }
  async function removerTransformador(id: string) {
    try {
      await api.delete<TransformadorDTOS>(`http://localhost:3001/linha/${id}`)
      dispatch(remove({ id }))
    } catch (err) {
      console.log(err)
    }
  }




  function handleActivePopup(message: string) {
    setMessage(message)
    setActivePopupRender(true)
    setInterval(() => {
      setActivePopupRender(false)
    }, 10000)
  }
  async function addLinhas(event: FormEvent<Element>) {
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
      linha: linha,
      transformador
    })



    if (verifyDe.isVerifyBarra && verifyPara.isVerifyBarra) {


      const isVerify = linha.some(resp => resp.id === valueIdTransformador)

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
          const response = await api.post('http://localhost:3001/linha', {
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
          console.log(error)
        }
        return
      }
      handleActivePopup('DIGITE O VALOR DA LISTA OU SELECIONA')
    }
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
      console.log(barraDe, barraPara)
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
    dispatch(fetchLinhas())
    dispatch(fetchTransformador())
    dispatch(fetchBarras())


  }, [])
  return (

    <Container>
      {activePopupRender && <Popup message={message} />}
      <HeaderContainer>
        <div>
          <h3>Linha</h3>
          <p>As linhas representam os condutores que transmitem energia entre as barras, essenciais para o fluxo de energia ao longo da rede.</p>
        </div>
        <ButtonHeader onClick={() => handleAction('ADD')}>Adicionar</ButtonHeader>
      </HeaderContainer>
      {linha.length > 0 ? <ContainerDiv><Table>
        <thead>
          <tr>
            <th>Código</th>
            <th>BarraDe</th>
            <th>BarraPara</th>
          </tr>
        </thead>
        <tbody>
          {linha.map((response, index) =>
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
      </Table></ContainerDiv> : <Info>Nenhuma linha cadastrado.</Info>}

      <FormContainer actives={active.toString()}>
        <Form onSubmit={Action[actionMethod].function}>
          <button type="button" onClick={close}>
            <X />
          </button>
          <h2>{Action[actionMethod].title}</h2>
          <input type="text" disabled={actionMethod === 'EDIT'} placeholder="Digite o código da linha" value={valueIdTransformador} onChange={(event) => handleBarra(event, setValueIdTransformador)} />
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