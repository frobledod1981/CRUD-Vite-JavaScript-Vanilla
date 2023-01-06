import modalHtml from './mostrar-modal.html?raw';
import {Usuario} from '../../models/usuario';
import { obtenerUsuariosPorID } from '../../casos-de-uso/obtener-usuarios-por-id';
import './mostrar-modal.css';

let modal,form;        //!En determinado punto del tiempo no va a tener nada
let usuarioCargado ={};//!Sirve para saber si hubo informacion cargada y luego añadirsela al objeto que yo tenia antes o que voy a grabar

/**
 * 
 * @param {HTMLDivElement} elemento 
 */

export const mostrarModal = async(id) => {

    modal?.classList.remove('hide-modal');

    usuarioCargado = {};//!Para asegurarme que siempre siempre voy a tener un objeto en el cual hacer el operador spreed

    if(!id) return;

    const usuario = await obtenerUsuariosPorID(id);

    setValoresFormulario(usuario);

};
export const ocultarModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
};

/**
 * 
 * @param {Usuario} usuario
 */
const setValoresFormulario = (usuario) => {
    form.querySelector('[name="firstName"]').value = usuario.firstName;
    form.querySelector('[name="lastName"]').value = usuario.lastName;
    form.querySelector('[name="balance"]').value = usuario.balance;
    form.querySelector('[name="isActive"]').value = usuario.isActive;
    usuarioCargado = usuario;
}


/**
 * 
 * @param {HTMLdivElement} elemento 
 * @param {(userLike)=> Promise<void>} guardarUsuarioCallback
 */
export const RenderModal = (elemento,guardarUsuarioCallback) => {

    if(modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click',(evento) => {
        // console.log(evento.target);
        if(evento.target.className === 'modal-container'){
            ocultarModal();
        }
    });

    form.addEventListener('submit',async(evento) => {

        //envio al backend informacion
        evento.preventDefault();
        console.log('Formulario enviado');

        const datosFormulario = new FormData(form);
        const userLike = {...usuarioCargado};//!solo tenemos informacion del usuario no la info adicional como el genero que no le damos mantenimiento por eso hacemos operador spread...loadUser

        for(const [llave,valor] of datosFormulario){
            if(llave === 'balance'){
                userLike[llave] = +valor;
                continue;
            }
            if(llave === 'isActive'){
                userLike[llave] = (valor === 'on') ? true : false;
                continue;
            }
            userLike[llave] = valor;
            //  console.log(userLike);
        }

        await guardarUsuarioCallback(userLike);

        ocultarModal();
    })

    elemento.append(modal);
}