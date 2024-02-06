import React from "react";
import { useAppSelector } from "../../store";
import { Card, Container } from "./style";

export function Dashboard(){
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
  return(
    <Container>
      <Card>
        <h2>Barra</h2>
        <p>{barra.length}</p>
      </Card>
      <Card>
        <h2>Gerador</h2>
        <p>{gerador.length}</p>
      </Card>
      <Card>
        <h2>Transformador</h2>
        <p>{transformador.length}</p>
      </Card>
      <Card>
        <h2>Linhas</h2>
        <p>{linha.length}</p>
      </Card>
    </Container>
  )
}