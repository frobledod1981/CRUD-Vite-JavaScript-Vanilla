import usuarioStore from '../usuarios/store/usuario-store';
import { guardarUsuario } from './casos-de-uso/guardar-usuario';
import { RenderBotonAgregar } from './presentacion/mostrar-boton-agregar/mostrar-boton-agregar';
import { RenderBotones } from './presentacion/mostrar-botones/mostrar-botones';
import { RenderModal } from './presentacion/mostrar-modal/mostrar-modal';
import { RenderTable } from './presentacion/mostrar-tabla/mostrar-tabla';


/**
 * 
 * @param {HTMLdivElement} elemento 
 */
export const UsuarioApp = async(elemento) => {
    elemento.innerHTML = 'Loading';
    await usuarioStore.cargarProximaPagina();
    elemento.innerHTML = '';
    
    
    RenderTable(elemento);
    RenderBotones(elemento);
    RenderBotonAgregar(elemento);
    RenderModal(elemento,async(userLike) => {
        const usuario = await guardarUsuario(userLike);
        // console.log(usuario);
        usuarioStore.usuariosCambiados(usuario);
        RenderTable();
    });
   
    
}