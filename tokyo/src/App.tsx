import { useState } from 'react'
import './App.css'

//função principal
export default function App() {
  const [input, setInput] = useState("");
  const [tarefa, setTarefa] = useState([
    'Estudar',
    'Lavar louça',
    'Descansar'
  ])

  const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefa:''
  });


  function registrar(){
    if (!input){
      alert("Preencha o nome da sua tarefa")
      return;
    }
    if(editarTarefa.enabled){
      editarTarefaSalva();
      return;
    }
    setTarefa(tarefa => [...tarefa, input])
    setInput("")
  }
  function editarTarefaSalva(){
    const findIndexTarefa = tarefa.findIndex(tarefa => tarefa === editarTarefa.tarefa)
    const todasTarefas = [...tarefa]

    todasTarefas[findIndexTarefa] = input;
    setTarefa(todasTarefas);
    setEditarTarefa({
      enabled:false,
      tarefa: ''
    })
    setInput("")
  }
  
  function excluir (item: string){
    const excluirTarefa = tarefa.filter(tarefa => tarefa !== item)
    setTarefa(excluirTarefa)
  }
  function editar (item: string){
    setInput(item)
    setEditarTarefa({
      enabled: true,
      tarefa: item
    }) 
  }
  return (

    <div>
        <h1>Todo List</h1>

        <input
        placeholder="Digite uma senha..."
        value ={input}
        onChange={ (e) => setInput(e.target.value)}
        />
        <button onClick={registrar}>Adicionar tarefa</button>
        <hr/>
        {tarefa.map( (item, index)=> (
          <section key={item}>
          <span>{item}</span>
          <button onClick={()=> excluir(item)}>Excluir</button>
          <button onClick={()=> editar(item)}>Editar</button>
          </section>
        ))}


    </div>
  )
}


