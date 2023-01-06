import {servidorLocalAModelo} from '../mapper/localhost-usuario';
import {Usuario} from '../models/usuario';

/**
 * 
 * @param {Number} page 
 * @returns {Promise<Usuario[]>}
 */
export const cargarUsuariosPorPagina = async(page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    //  console.log(data);

    const usuarios = data.map(userLike=> servidorLocalAModelo(userLike));
//    console.log(usuarios);
    return usuarios;
}