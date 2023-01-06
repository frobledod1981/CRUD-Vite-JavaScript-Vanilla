import usuarioStore from '../../store/usuario-store';
import {RenderTable} from '../mostrar-tabla/mostrar-tabla';
import './mostrar-botones.css';


/**
 * 
 * @param {HTMLDivelement} elemento 
 */
export const RenderBotones = (elemento) => {

    const botonSiguiente = document.createElement('button');
    botonSiguiente.innerText = 'Siguiente >';

    const botonAnterior = document.createElement('button');
    botonAnterior.innerText = '< Anterior ';

    const paginaActual = document.createElement('span');
    paginaActual.id = 'current-page';
    paginaActual.innerText = usuarioStore.obtenerPaginaActual();

    elemento.append(botonAnterior,paginaActual,botonSiguiente);


    botonSiguiente.addEventListener('click', async() => {
        await usuarioStore.cargarProximaPagina();
        paginaActual.innerText = usuarioStore.obtenerPaginaActual();
        RenderTable(elemento);
    })

    botonAnterior.addEventListener('click', async() => {
        await usuarioStore.cargarPaginaAnterior();
        paginaActual.innerText = usuarioStore.obtenerPaginaActual();
        RenderTable(elemento);
    })


}