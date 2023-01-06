import {Usuario} from '../models/usuario';


/**
 * 
 * @param {Like<Usuario>} localhostUser 
 * @returns {Usuario}
 */
export const servidorLocalAModelo = (localhostUser) => {

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name

    } = localhostUser;

    return new Usuario({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name
    });
}