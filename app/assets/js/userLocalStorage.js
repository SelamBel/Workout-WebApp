import Usuario from "./Usuario.js";

const STORAGE_KEY = "usuariosApp";

function obtenerUsuarios() {
    const usuariosJSON = localStorage.getItem(STORAGE_KEY);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

export function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();

    const existe = usuarios.some(u => usuario.comprobarIgualdadStr(u.usuario, u.correo));

    if (existe) {
        console.warn(`El usuario "${usuario.usuario}" o correo "${usuario.correo}" ya existe.`);
        return false; 
    }

    usuarios.push({
        usuario: usuario.usuario,
        contraseña: usuario.contraseña,
        nombre: usuario.nombre,
        correo: usuario.correo,
        altura: usuario.altura,
        peso: usuario.peso,
        edad: usuario.edad,
        genero: usuario.genero,
        entrenamientos: usuario.entrenamientos
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    return true;
}

export function loginUsuario(usuario, contraseña) {
    const usuarios = obtenerUsuarios();
    const encontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    return encontrado ? new Usuario(
        encontrado.usuario,
        encontrado.contraseña,
        encontrado.nombre,
        encontrado.correo,
        encontrado.altura,
        encontrado.peso,
        encontrado.edad,
        encontrado.genero
    ) : null;
}




