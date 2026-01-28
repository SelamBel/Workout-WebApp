import Usuario from "./Usuario.js";

const ALL_USERS = "allUsers";
const CURRENT_USER = "currentUser";

function obtenerUsuarios() {
    const usuariosJSON = localStorage.getItem(ALL_USERS);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

export function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();

    const existe = usuarios.some(u => usuario.comprobarIgualdadStr(u.usuario, u.correo));

    if (existe) {
        alert(`El usuario "${usuario.usuario}" o correo "${usuario.correo}" ya existe.`);
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

    const userJSON = JSON.stringify(usuarios);
    localStorage.setItem(ALL_USERS, JSON.stringify(usuarios));
    localStorage.setItem(CURRENT_USER, JSON.stringify({
        usuario: usuario.usuario,
        contraseña: usuario.contraseña,
        nombre: usuario.nombre,
        correo: usuario.correo,
        altura: usuario.altura,
        peso: usuario.peso,
        edad: usuario.edad,
        genero: usuario.genero,
        entrenamientos: usuario.entrenamientos
    }));

    return true;
}

export function loginUsuario(usuario, contraseña) {
    const usuarios = obtenerUsuarios();
    const encontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

    if (encontrado) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(encontrado));
    }

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

export function logOutUsuario() {
    localStorage.removeItem(CURRENT_USER);
}

export function getCurrentUser() {
    const usuarioJSON = localStorage.getItem(CURRENT_USER);
    let usuario = null;
    if (usuarioJSON) {
        const u = JSON.parse(usuarioJSON);
        usuario = new Usuario(
            u.usuario,
            u.contraseña,
            u.nombre,
            u.correo,
            u.altura,
            u.peso,
            u.edad,
            u.genero
        );
    }
    return usuario;
}

export function getUsers() {
    const usuariosJSON = localStorage.getItem(ALL_USERS);
    const usuarios = [];
    if (usuariosJSON) {
        const usuariosArray = JSON.parse(usuariosJSON);
        for (const u of usuariosArray) {
            usuarios.push({
                usuario: u.usuario,
                correo: u.correo
            });
        }
    }
    return usuarios;
}




