import React, { useEffect, useState } from 'react'
import { Await, Link, useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService'
import PatchDelete from '../../pages/PatchDelete/PatchDelete'
import '../TodoList/TodoList.css'

function TodoList() {
  /* Const principales */
  const navegar = useNavigate();
  const [task,setTask]=useState("")
  const [date,setDate]=useState("")
  const [espacio,setEspacio]=useState([])
  const [error, setError]=useState("")
  const [filtro,setFiltro]=useState("all")
  /* Funcion del get */
  useEffect(() =>{
    const fecthTareas = async () =>{
      try {
        const tareasObtenidas = await UserService.getTareas();
        setEspacio(tareasObtenidas);
        
      } catch (error) {
        console.error("Error al traer las tareas", error);     
      }
    }
    fecthTareas() 
  },[]
)
  /* Pars evitar que se suban tareas vacias */
  const revisarInputs = () => {
    if(!task || !date){
      setError("Llena todos los espacios");
      return false;
    }
    setError("");
    return true;
  }
  /* Visual, Post + valor */
  const subirTarea = async () =>{
      if(!revisarInputs())return;
      let postAudio = new Audio('/sounds/30 - All Chaos Emeralds.mp3')
      const nuevoTask = {tarea: task, date, completada: false};
      try{
        /* esto es para postearla y limpiar los inputs */
        const tareaGuardada = await UserService.postTareas(nuevoTask);
        setEspacio([...espacio,tareaGuardada]);
        setTask('');
        setDate('');
        await postAudio.play()
      }catch(error) {
        console.error('Error al subir la tarea / task',error);
      }
    };
    /* Funcion de la tecla Enter */
    const handleKeyDown = async (e) => {
      if (e.key === 'Enter'){
        if(!revisarInputs())return;
        let postAudio = new Audio('/sounds/yes!.m4a')
        const nuevoTask = {tarea: task, date, completada: false, pendiente: true};
      try{
        const tareaGuardada = await UserService.postTareas(nuevoTask);
        setEspacio([...espacio,tareaGuardada]);
        setTask('');
        setDate('');
        await postAudio.play()
      }catch (error) {
        console.error('Error al subir la tarea / task',error);
        }
      }
    }
    /* Esto es lo del select */
    const tareasFiltradas=espacio.filter(t =>{
      if (filtro === "all") return true;
      if (filtro === "complete") return t.completada === true;
      if (filtro === "pending") return t.completada === false;
      return true;
    });
  return (
    <div>
      <h1><img className='mediumicons' src="https://img.icons8.com/?size=60&id=8X4nr61RTGOd&format=png" alt="" />To-Do list</h1>
      <br />
      <div className='contenedorPrincipal'>
        {/* Subir Tareas */}

        <div className='contenedorTareas'>
          <h2>Sube una tarea</h2>

          <label className='label' htmlFor="tarea">
            <input className='input' type="text" onKeyDown={handleKeyDown} id='inputTarea' value={task} onChange={(t) => setTask(t.target.value)} />
            <input className='input' type="date" onKeyDown={handleKeyDown}id='inputFecha' value={date} onChange={(f) => setDate(f.target.value)}/>
          </label>
        
          <button onClick={subirTarea}>Subir tarea<img className='tinyicons' src="https://img.icons8.com/?size=60&id=I9kh61ROMiFd&format=png" alt="->" /></button>
        </div>

        {/* Contador de tareas */}
        <div className='contenedorContador'>
          <h2>Tareas Completadas</h2>
          <div className='cssContador' id='contador'>
            <h3>{espacio.filter(tarea => tarea.completada).length}</h3>
          </div>
        </div>
      </div>
      <br />
      {error && <h1 style={{color:"red"}}>{error}</h1>} 
      <h4>Sonido</h4>
      <button className='btnSilencio'><img className='tinyicons' src="https://img.icons8.com/?size=60&id=bQa3nB3En2r3&format=png" alt="silenciar" />Activar</button>
      <br />
      <button className='btnSilencio'><img className='tinyicons' src="https://img.icons8.com/?size=60&id=Luw9exmEqxUH&format=png" alt="silenciar" />Desactivar</button>
      <h4>Filtro</h4>
      <select className='select'value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="all">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="complete">Completas</option>
      </select>
      <br /><br /><br />
      {/* Espacio de las tareas subidas */}
      <h2 className='tareaTitulo'>Tareas</h2>
        <div>
          {tareasFiltradas.length === 0 ? (
            <p className='sinResultados'>Sin resultados</p>
          ) : (
            tareasFiltradas.map((t, index) => (
              <PatchDelete
                key={index}
                tarea={t}
                onDelete={(id) => setEspacio(espacio.filter((x) => x.id !== id))}
                onToggle={(actualizado) =>
                  setEspacio(espacio.map((x) => (x.id === actualizado.id ? actualizado : x)))
                }
              />
            ))
          )}
        </div>
    </div>
  )
}

export default TodoList