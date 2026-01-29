import { logOutUsuario, getCurrentUser, getUsers, updateCurrentUser } from "./userLocalStorage.js";
import Usuario from "./Usuario.js";
import Entrenamiento from "./Entrenamiento.js";
import * as CardMaker from "./cardMaker.js";

const container = $("#container");
let currentUser;
$(document).ready(function () {
    init();
});

function init() {
    exitIfNotLogged();
    bindEvents();
    correctUserNameTitle();
}

function exitIfNotLogged() {
    currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = "../index.html";
    }
}

function bindEvents() {
    $("#mainLogOutBtn").on("click", logOut);
    $("#mainShowProfileBtn").on("click", showProfile);
    $("#mainShowUsersBtn").on("click", showUsers);
    $("#mainOpenForum").on("click", notImplementedAlert);

    $("#mainAddWorkOuts").on("click", () => toggleCards("card-addWorkOut"));
    $("#mainShowWorkOuts").on("click", showWorkOuts);
    $("#mainShowBestWorkOut").on("click", () => toggleCards("card-showBestWorkOut"));
    $("#mainShowTotalKM").on("click", showTotalKM);

    $("#submitAddWorkOut").on("click", submitWorkOut);
    $("#findBestWorkOut").on("click", findBestWorkOut);
}

function correctUserNameTitle() {
    $("#user-name").text(`Bienvenido ${currentUser.nombre}`);
}


function logOut() {
    logOutUsuario();
    window.location.href = "../index.html";
}

function showProfile() {
    toggleCards();
    const card = CardMaker.createCard();
    CardMaker.setCardTitle(card, "Perfil de Usuario");
    const content = CardMaker.createCardContent(card);
    CardMaker.addElement(content, "p", { text: `Nombre: ${currentUser.nombre}` });
    CardMaker.addElement(content, "p", { text: `Email: ${currentUser.correo}` });
    CardMaker.addElement(content, "p", { text: `Altura: ${currentUser.altura} cm` });
    CardMaker.addElement(content, "p", { text: `Peso: ${currentUser.peso} kg` });
    CardMaker.addElement(content, "p", { text: `Edad: ${currentUser.edad} años` });
    CardMaker.addElement(content, "p", { text: `Género: ${currentUser.genero}` });
    container.append(card);
}

function showUsers() {
    toggleCards();
    const card = CardMaker.createCard();
    CardMaker.setCardTitle(card, "Lista de Usuarios");
    const content = CardMaker.createCardContent(card);
    const usuarios = getUsers();
    const userList = CardMaker.addElement(content, "ul");
    usuarios.forEach((usuario, i) => {
        CardMaker.addElement(userList, "li", { text: `${i + 1}. Nombre: ${usuario.usuario}, Email: ${usuario.correo}` });
    });
    container.append(card);
}

function submitWorkOut() {
    const distancia = parseFloat($("#distancia").val());
    const tiempo = parseFloat($("#tiempo").val());

    if (isNaN(distancia) || isNaN(tiempo) || distancia <= 0 || tiempo <= 0) {
        alert("Por favor, ingrese valores válidos para distancia y tiempo.");
        return;
    }

    const entrenamiento = new Entrenamiento(distancia, tiempo);
    currentUser.añadirEntrenamiento(entrenamiento);

    const card = CardMaker.createCard();
    CardMaker.setCardTitle(card, "Resultado de añadir entrenamiento");
    const content = CardMaker.createCardContent(card);
    if (updateCurrentUser(currentUser)) {
        CardMaker.addElement(content, "p", { text: `Se ha creado con exito.` });
    } else {
        CardMaker.addElement(content, "p", { text: `Ha habido un error actualizando el usuario.` });
    }
    container.append(card);
}

function showWorkOuts() {
    toggleCards();
    let entrenamientosActuales = currentUser.entrenamientos;

    const card = CardMaker.createCard();
    CardMaker.setCardTitle(card, "Entrenamientos de " + currentUser.nombre);
    const content = CardMaker.createCardContent(card);

    if (!entrenamientosActuales || entrenamientosActuales.length === 0) {
        CardMaker.addElement(content, "p", { text: `No tienes entrenamientos apuntados.` });
        container.append(card);
        return;
    }

    entrenamientosActuales.forEach((entrenamiento, index) => {
        CardMaker.addElement(content, "li", {
            text: `#${index + 1} - Distancia: ${entrenamiento.distancia} km | Tiempo: ${entrenamiento.tiempo} min | Velocidad: ${entrenamiento.velocidad} | Nivel: ${entrenamiento.nivelEsfuerzo}`
        });
    });

    container.append(card);
}

function findBestWorkOut() {
    $(".created-card").remove()
    const card = CardMaker.createCard();
    let entrenamientos = currentUser.entrenamientos;
    const metodoSeleccionado = $('input[name="metodoFiltrado"]:checked').val();

    CardMaker.setCardTitle(card, "Mejor entrenamiento por " + metodoSeleccionado);
    let content = CardMaker.createCardContent(card);
    if (!entrenamientos || entrenamientos.length === 0) {
        CardMaker.addElement(content, "p", { text: `No tienes entrenamientos apuntados.` });
        container.append(card);
        return;
    }

    let mejorEntrenamiento = entrenamientos[0];
    entrenamientos.forEach(entrenamiento => {
        if (entrenamiento[metodoSeleccionado] > mejorEntrenamiento[metodoSeleccionado]) {
            mejorEntrenamiento = entrenamiento;
        }
    });

    CardMaker.addElement(content, "p", { text: `Distancia: ${mejorEntrenamiento.distancia} km | Tiempo: ${mejorEntrenamiento.tiempo} min | Velocidad: ${mejorEntrenamiento.velocidad} | Nivel: ${mejorEntrenamiento.nivelEsfuerzo}` });
    container.append(card);
}

function showTotalKM() {
    toggleCards();
    const card = CardMaker.createCard();
    CardMaker.setCardTitle(card, "Total de KM recorridos");

    let entrenamientos = currentUser.entrenamientos;
    let sumKM = 0;
    entrenamientos.forEach(entrenamiento => {
        sumKM += entrenamiento.distancia
    });

    const content = CardMaker.createCardContent(card);
    CardMaker.addElement(content, "p", { text: `Has recorrido un total de ${sumKM} km. Bien hecho.`});
    container.append(card);
}

function toggleCards(cardId) {
    $(".created-card").remove()
    $(".toggle").removeClass("hidden");
    $(".toggle").addClass("hidden");
    $(`#${cardId}`).removeClass("hidden");
}

function notImplementedAlert() {
    alert("Funcionalidad no implementada aún.");
}