
import { servidorLocalAModelo } from '../mapper/localhost-usuario';
import { usuarioModeloAServidorLocal } from '../mapper/usuario-localhost';
import {Usuario} from '../models/usuario';

/**
 * 
 * @param {Like<Usuario>} userLike 
 */
export const guardarUsuario = async(userLike) => {

    const usuario = new Usuario(userLike);

    if(!usuario.firstName || !usuario.lastName)
       throw 'Nombre & Apellido son Requeridos';

       const usuarioAguardar = usuarioModeloAServidorLocal(usuario);

       let actualizaUsuarios;

       if(usuario.id){
           actualizaUsuarios = await actualizarUsuario(usuarioAguardar);
            
    }else{
           actualizaUsuarios = await crearUsuario(usuarioAguardar);
       }

       return servidorLocalAModelo(actualizaUsuarios);
}

const crearUsuario = async(usuario) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    // console.log({newUser});
    return newUser;

}
/**
 * 
 * @param {Usuario} usuario 
 * @r
 */
const actualizarUsuario = async(usuario) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${usuario.id}`;
    const res = await fetch(url,{
        method: 'PATCH',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const actualizaUsuario = await res.json();
    console.log({actualizaUsuario});
    return actualizaUsuario;

}





