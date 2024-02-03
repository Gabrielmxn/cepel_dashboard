import React from "react";
import { useDispatch } from "react-redux";
import { BarraDTOs } from "../../DTOS/barra";
import { useAppSelector } from "../../store";
import { add, remove } from "../../store/slices/barra";
import { api } from "../../utils/axios";

import './style.css'



export function Barra(){

  const store = useAppSelector(store => {

    return store.barra.barras
  })

  const dispatch = useDispatch()
 

  async function addBarra() {
    const response = await api.post<BarraDTOs>('http://localhost:3001/barra')

    const data =  response.data
      console.log(data)
    dispatch(add(
      data
    ))
    
  }



  return(
    <section className="container-equipamentos">
  
    <div className="header-card">
      <h3>Barra</h3>
      <button onClick={() => addBarra()}>Adicionar nova barra</button>
    </div>
    {
      store && <table>
      <thead>
        <th>Código</th>
      </thead>
      <tbody>
        {store.map(response => 
          <tr key={response.id}>
            <td>{response.id}</td>
            <td><button onClick={() =>  dispatch(remove({ id: response.id}))}>remover</button></td>
          </tr>
        )}
      </tbody>
    </table>
    }
  </section>

  )
}