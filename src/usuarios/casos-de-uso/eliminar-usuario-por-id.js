


/**
 * 
 * @param {String|Number} id 
 */
export const borraUsuarioPorId = async(id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url,{
        method: 'DELETE',
    });

    const borraResultado = await res.json();;
    console.log({borraResultado});
    return true;
}

