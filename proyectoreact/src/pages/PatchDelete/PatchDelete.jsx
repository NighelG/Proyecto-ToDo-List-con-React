import React from 'react';
import UserService from '../../services/UserService';
import TodoList from '../../components/TodoList/TodoList';
import '../PatchDelete/PatchDelete.css'

function PatchDelete({ tarea, onDelete, onToggle }) {
    /* Lo del delte */
    const eliminarTarea = async () => {
      try {
        const eliminado = await UserService.deleteTarea(tarea.id);
        if (eliminado) {
          onDelete(tarea.id);
        }
      }catch (error){
        console.error("Error al eliminar la tarea", error);
      }
    };
    /* Para completaralas */
    const tareaCompletada = async () => {
      try{
        const actu = await UserService.patchTareas(tarea.id,{
          completada: !tarea.completada,
        });
        onToggle(actu)
      } catch (error){
        console.error("Error al actualizar");
        
      }
    }
  return (
    /* Me estrese mucho modificando y moviendo esto del otro jsx */
    <div style={{ display: 'flex', alignItems: 'left', justifyContent:'space-between', marginBottom:'10px'  }}>
      <label className='container'>
        <input type="checkbox"checked={tarea.completada}onChange={tareaCompletada}/>
        <div className='checkmark'></div>
        {tarea.date} {tarea.tarea} {tarea.completada ? "(Completada)" : ""}
      </label>
      <button className='buttonDelete' onClick={eliminarTarea}><img className='tinyicons' src="https://img.icons8.com/?size=60&id=QFAMAEC2jXs6&format=png" alt="borrar" /></button>
    </div>
  )
}

export default PatchDelete