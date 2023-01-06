import {Usuario} from '../models/usuario';


/**
 * 
 * @param {Usuario} usuario 
 */
export const usuarioModeloAServidorLocal = (usuario) => {

    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName
    } = usuario;

    return {
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName
    }
}