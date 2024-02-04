import { Gerador } from "../DTOS/gerador"
import { Linha } from "../DTOS/linha"
import { Transformador } from "../DTOS/transformador"

interface VerifyBarra{
  idBarra: string
  gerador: Gerador[]
  transformador: Transformador[]
  linha: Linha[]
}


export async function verifyBarra({idBarra, gerador, transformador, linha}: VerifyBarra){
  let count = 0
  const geradores = gerador.filter(response => response.barraId === idBarra)
  count += geradores.length
  if(geradores.length === 2){
    return {
    count,
    isVerifyBarra: false
  }
  }
  const transformadores = transformador.filter(response => response.barraDe === idBarra || response.barraPara === idBarra)
  if(geradores.length === 1 && transformadores.length === 1){
   return {
    count,
    isVerifyBarra: false
  }
  }
  count += transformadores.length
  const linhas = linha.filter(response => response.barraDe === idBarra || response.barraPara === idBarra)
  if(geradores.length === 1 && linhas.length === 1){
   return {
    count,
    isVerifyBarra: false
  }
  }
  count += linhas.length
  return {
    count,
    isVerifyBarra: true
  }
} 