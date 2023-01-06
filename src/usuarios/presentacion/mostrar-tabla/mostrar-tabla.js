
import { borraUsuarioPorId } from '../../casos-de-uso/eliminar-usuario-por-id';
import usuarioStore from '../../store/usuario-store';
import { mostrarModal } from '../mostrar-modal/mostrar-modal';
import './mostrar-tabla.css';


let tabla;


/**
 * 
 * @returns {HTMLTableElement}
 */
const crearTabla = () => {
    const tabla = document.createElement('table');
    const encabezadotabla = document.createElement('thead');
    encabezadotabla.innerHTML = `
       <tr>
           <th>#ID</th>
           <th>Balance</th>
           <th>FirstName</th>
           <th>LastName</th>
           <th>Active</th>
           <th>Actions</th>
       </tr>
    `;

    const cuerpoTabla = document.createElement('tbody');
    tabla.append(encabezadotabla,cuerpoTabla);
    return tabla;
};

 const escuchaSeleccionDeTabla = (evento) => {
        // console.log(evento.target);
        const elemento = evento.target.closest('.select-user');
        // console.log(elemento);
        if(!elemento) return;

        const id = elemento.getAttribute('data-id');
        mostrarModal(id);
}

const escuchaEliminacionTabla = async(evento) => {
    // console.log(evento.target);
    const elemento = evento.target.closest('.delete-user');

    if(!elemento) return;

    const id = elemento.getAttribute('data-id');

    try{
         await borraUsuarioPorId(id);
         await usuarioStore.recargarPagina();
         document.querySelector('#current-page').innerText = usuarioStore.obtenerPaginaActual();
         RenderTable();
    }catch(error){
         console.log(error);
         alert('Registro NO Eliminado');
    }
}



/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RenderTable = (element) => {

    //es sincrono por que los renderiza como esta en el store
    const usuarios = usuarioStore.obtenerUsuarios();
    if(!tabla){
        
        tabla = crearTabla();
        element.append(tabla);

        tabla.addEventListener('click',evento => escuchaSeleccionDeTabla(evento));
        tabla.addEventListener('click',escuchaEliminacionTabla);

    }


    let tablaHTML = ''
    usuarios.forEach(user => {
        tablaHTML += `
        <tr>
        <td>${ user.id}</td>
        <td>${ user.balance }</td>
        <td>${ user.firstName }</td>
        <td>${ user.lastName }</td>
        <td>${ user.isActive}</td>
        <td>
            <a href="#/"  class="select-user" data-id="${ user.id}">Select</a>
            | 
            <a href="#/"  class="delete-user" data-id="${ user.id}">Delete</a> 
        </td>
        </tr>
        `
    });
    
    tabla.querySelector('tbody').innerHTML = tablaHTML;
   
    

}


