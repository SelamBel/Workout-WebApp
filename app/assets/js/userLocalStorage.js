import Usuario from "./Usuario.js";
import Entrenamiento from "./Entrenamiento.js";

const ALL_USERS = "allUsers";
const CURRENT_USER = "currentUser";
const DELETE_MODAL = "deleteModal";

function obtenerUsuarios() {
    const usuariosJSON = localStorage.getItem(ALL_USERS);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

function reconstruirUsuarioDesdeJSON(u) {
    const entrenamientos = u.entrenamientos?.map(e => {
        const entr = new Entrenamiento(e.distancia, e.tiempo);
        entr.fecha = new Date(e.fecha);
        entr.nivelEsfuerzo = e.nivelEsfuerzo;
        return entr;
    }) || [];

    return new Usuario(
        u.usuario,
        u.contraseña,
        u.nombre,
        u.correo,
        u.altura,
        u.peso,
        u.edad,
        u.genero,
        entrenamientos
    );
}

function convertirUsuarioAJSON(u) {
    return {
        usuario: u.usuario,
        contraseña: u.contraseña,
        nombre: u.nombre,
        correo: u.correo,
        altura: u.altura,
        peso: u.peso,
        edad: u.edad,
        genero: u.genero,
        entrenamientos: u.entrenamientos.map(e => ({
            distancia: e.distancia,
            tiempo: e.tiempo,
            fecha: e.fecha,
            nivelEsfuerzo: e.nivelEsfuerzo
        }))
    };
}

export function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    const existe = usuarios.some(u => usuario.comprobarIgualdadStr(u.usuario, u.correo));
    if (existe) return false;

    const usuarioJSON = convertirUsuarioAJSON(usuario);
    usuarios.push(usuarioJSON);
    localStorage.setItem(ALL_USERS, JSON.stringify(usuarios));
    localStorage.setItem(CURRENT_USER, JSON.stringify(usuarioJSON));
    return true;
}

export function loginUsuario(usuario, contraseña) {
    const usuarios = obtenerUsuarios();
    const encontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    if (encontrado) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(encontrado));
        return reconstruirUsuarioDesdeJSON(encontrado);
    }
    return null;
}

export function logOutUsuario() {
    localStorage.removeItem(CURRENT_USER);
}

export function getCurrentUser() {
    const usuarioJSON = localStorage.getItem(CURRENT_USER);
    if (!usuarioJSON) return null;
    const u = JSON.parse(usuarioJSON);
    return reconstruirUsuarioDesdeJSON(u);
}

export function getUsers() {
    const usuariosJSON = localStorage.getItem(ALL_USERS);
    const usuarios = [];
    if (usuariosJSON) {
        const usuariosArray = JSON.parse(usuariosJSON);
        for (const u of usuariosArray) {
            usuarios.push({ usuario: u.usuario, correo: u.correo });
        }
    }
    return usuarios;
}

export function updateCurrentUser(updatedUser) {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.usuario === updatedUser.usuario);
    if (index === -1) return false;

    const usuarioJSON = convertirUsuarioAJSON(updatedUser);
    usuarios[index] = usuarioJSON;
    localStorage.setItem(ALL_USERS, JSON.stringify(usuarios));
    localStorage.setItem(CURRENT_USER, JSON.stringify(usuarioJSON));
    return true;
}

export function checkModal(){
    let choice = localStorage.getItem(DELETE_MODAL);
    return choice;
}

export function deleteModal(){
    localStorage.setItem(DELETE_MODAL, true);
}
