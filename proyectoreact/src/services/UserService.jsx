/* GET */
async function getTareas() {
    try {
        const response = await fetch('http://localhost:3001/tareas',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
            const tarea = await response.json()
            return tarea
    } catch (error) {
        console.error("ERROR, algo salio mal al obtener la informacion de la tarea",error);
        throw error
    }
}
/* POST */
async function postTareas(objTareas) {
    try {
        const response = await fetch('http://localhost:3001/tareas',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(objTareas)
        })
            const tareaData = await response.json()
            return tareaData
    } catch (error) {
        console.error("ERROR, no se pudo subir la informacion de la Tarea",error);
        throw error
    }
}

/* PATCH */
async function patchTareas(id, data) {
    try {
        const response = await fetch('http://localhost:3001/tareas/'+id,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
            const tareaActualizado = await response.json()
            return tareaActualizado
    } catch (error) {
        console.error("ERROR, no se pudo Actualizar la informacion de la tarea",error);
        throw error
    }
}

/* DELETE */
async function deleteTarea(id, data) {
    try {
        const response = await fetch('http://localhost:3001/tareas/'+id,{
            method:'DELETE'
        })
            const tareaEliminada = await response.json()
            return tareaEliminada
    } catch (error) {
        console.error("ERROR, no se pudo eliminar la tarea",error);
        throw error
    }
}


/* Exports */
export default {postTareas,getTareas,patchTareas,deleteTarea}