import { mostrarModal } from '../mostrar-modal/mostrar-modal';
import './mostrar-boton-agregar.css';


/**
 * 
 * @param {HTMLdivElement} elemento 
 */
export const RenderBotonAgregar = (elemento) => {
    const botonFlotante = document.createElement('button');
    botonFlotante.innerText = '+';
    botonFlotante.classList.add('fab-button');
    

    elemento.append(botonFlotante);

    
    botonFlotante.addEventListener('click',()=> {

        mostrarModal();
    })



}