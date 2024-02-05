import React from "react";
import { Card, Container } from "./style";

export function Dashboard(){
  return(
    <Container>
      <Card>
        <h2>Barra</h2>
        <p>5</p>
      </Card>
      <Card>
        <h2>Gerador</h2>
        <p>5</p>
      </Card>
      <Card>
        <h2>Transformador</h2>
        <p>5</p>
      </Card>
      <Card>
        <h2>Linhas</h2>
        <p>5</p>
      </Card>
    </Container>
  )
}