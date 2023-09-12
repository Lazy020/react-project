import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'

//função principal
export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const primeiraR = useRef(true);

  const [input, setInput] = useState("");
  const [tarefa, setTarefa] = useState<string[]>([])

  const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefa:''
  })

  useEffect(() => {
    const tarefaSalva = localStorage.getItem("@cursoreact")
    if(tarefaSalva){
      setTarefa(JSON.parse(tarefaSalva));
    }
  }, [])

  useEffect(() => {
    if(primeiraR.current){
      primeiraR.current = false; 
      return;
  }
  localStorage.setItem("@cursoreact", JSON.stringify(tarefa));
}, [tarefa])

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
    localStorage.setItem("@cursoreact", JSON.stringify([...tarefa, input]))
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
    localStorage.setItem("@cursoreact", JSON.stringify(todasTarefas))
  }
  
  function excluir (item: string){
    const excluirTarefa = tarefa.filter(tarefa => tarefa !== item)
    setTarefa(excluirTarefa)
    localStorage.setItem("@cursoreact", JSON.stringify(excluirTarefa))
  }
  function editar (item: string){
    //inputRef.current?.focus();
    setInput(item)
    setEditarTarefa({
      enabled: true,
      tarefa: item
    }) 
  }
   const totalTarefas = useMemo(() => {
    return tarefa.length
   }, [tarefa])
  return (

    <div>
        <h1>Todo List★</h1>
        
        <input
        placeholder="Digite uma tarefa..."
        value ={input}
        onChange={ (e) => setInput(e.target.value)}
        ref = {inputRef}
        />
        <button onClick={registrar}>{editarTarefa.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
        <hr/>
        <strong> Você tem: {totalTarefas} tarefas!</strong>
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


