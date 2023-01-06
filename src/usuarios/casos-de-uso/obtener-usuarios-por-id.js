import { servidorLocalAModelo } from "../mapper/localhost-usuario";
// import {User} from '../models/usuario';

/**
 * 
 * @param {String|Number} id 
 * @returns {Promise<User>}
 */
export const obtenerUsuariosPorID = async(id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();//arreglo

    const usurios = servidorLocalAModelo(data);

    return usurios;
}