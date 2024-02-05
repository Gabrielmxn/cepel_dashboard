import { GeradorDTOs } from "../DTOS/gerador"
import { Linha } from "../DTOS/linha"
import { TransformadorDTOS } from "../DTOS/transformador"

interface VerifyBarra{
  idBarra: string
  geradors: GeradorDTOs[]
  transformador: TransformadorDTOS[]
  linha: Linha[]
}


export async function verifyBarra({idBarra, geradors, transformador, linha}: VerifyBarra){
  let count = 0
  const geradores = geradors.filter(response => response.barraId === idBarra)
  count += geradores.length
  if(count === 2){
    return {
    count,
    isVerifyBarra: false
  }
  }
  const transformadores = transformador.filter(response => response.barraDe === idBarra || response.barraPara === idBarra)
  count += transformadores.length
  if(count === 2){
   return {
    count,
    isVerifyBarra: false
  }
  }
  
  const linhas = linha.filter(response => response.barraDe === idBarra || response.barraPara === idBarra)
  count += linhas.length
  if(count === 2){
   return {
    count,
    isVerifyBarra: false
  }
  }

  return {
    count,
    isVerifyBarra: true
  }
} 