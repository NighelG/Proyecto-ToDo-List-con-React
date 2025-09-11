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

  /* Funcion de la searchbar */


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
      let postAudio = new Audio('/sounds/yes!.m4a')
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

          <br /><br />
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
        {/* Espacio de las tareas subidas */}
      <h2 className='tareaTitulo'>Tareas</h2>
      <img className='mediumicons' src="https://img.icons8.com/?size=60&id=vh31KMqhxPJn&format=png" alt="" />
      <label className='label'>
        <input className='input' type="search" />
      </label>
    
      <br /><br /><br />
        <div>
          {espacio.length === 0 ? (
            <p className='sinResultados'>Sin resultados</p>
          ) : (
            espacio.map((t, index) => (
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