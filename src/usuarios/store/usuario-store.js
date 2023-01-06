import { cargarUsuariosPorPagina } from '../casos-de-uso/cargar-usuarios-por-pagina';



const estado = {
    paginaActual: 0,
    usuarios: []
}

const cargarProximaPagina = async() => {
    // throw new Error('No implementado');
    // await cargarUsuariosPorPagina(estado.paginaActual + 1);
    const usuarios = await cargarUsuariosPorPagina(estado.paginaActual + 1);
    if(usuarios.length === 0) return;
    estado.paginaActual += 1;
    estado.usuarios = usuarios;
    // console.log(estado.usuarios);
}


const cargarPaginaAnterior = async() => {
    // throw new Error('No implementado');
    if(estado.paginaActual === 1) return;
    const usuarios = await cargarUsuariosPorPagina(estado.paginaActual - 1);
    estado.usuarios = usuarios;
    estado.paginaActual -= 1;
  
}

/**
 * 
 * @param {Usuario} updatedUser 
 */
const usuariosCambiados = (updatedUser) => {
    // throw new Error('No implementado');
    let fueEncontrado = false;
    estado.usuarios = estado.usuarios.map(usuario =>{
        if(usuario.id === updatedUser.id){
            fueEncontrado = true;
            return updatedUser;
        }
        return usuario
    });

    if(estado.usuarios.length < 10 && !fueEncontrado){
        estado.usuarios.push(updatedUser);
    }

    
}

const recargarPagina = async() => {
    // throw new Error('No implementado');
    const usuarios = await cargarUsuariosPorPagina(estado.paginaActual);
    if(usuarios.length === 0){
        await cargarPaginaAnterior();
        return;
    }
    estado.usuarios = usuarios;
}

export default {
    cargarProximaPagina,
    cargarPaginaAnterior,
    usuariosCambiados,
    recargarPagina,
    
    /**
     * 
     * @returns {Usuarios[]}
     */
    obtenerUsuarios: () => [...estado.usuarios],
    
     /**
     * 
     * @returns {Number[]}
     */
    obtenerPaginaActual: () => estado.paginaActual,
}