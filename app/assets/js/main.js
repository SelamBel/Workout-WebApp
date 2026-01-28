import { logOutUsuario, getCurrentUser } from "./userLocalStorage.js";
import Usuario from "./Usuario.js";
import * as CardMaker from "./cardMaker.js";

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
    $("#mainShowUsersBtn").on("click", notImplementedAlert);
    $("#mainOpenForum").on("click", notImplementedAlert);
    $("#mainAddWorkOuts").on("click", notImplementedAlert);
    $("#mainShowWorkOuts").on("click", notImplementedAlert);
    $("#mainShowBestWorkOut").on("click", notImplementedAlert);
    $("#mainShowTotalKM").on("click", notImplementedAlert);
}

function correctUserNameTitle() {
    $("#user-name").text(`Bienvenido ${currentUser.nombre}`);
}


function logOut() {
    logOutUsuario();
    window.location.href = "../index.html";
}

function showProfile() {
    $(".created-card").remove();
    const container = $("#container");
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


function notImplementedAlert() {
    alert("Funcionalidad no implementada aún.");
}