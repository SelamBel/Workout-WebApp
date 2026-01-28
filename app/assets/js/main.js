import { logOutUsuario, getCurrentUser } from "./userLocalStorage.js";
import Usuario from "./Usuario.js";

let currentUser = getCurrentUser();
$(document).ready(function () {
    init();
});

function init() {
    exitIfNotLogged();
    bindEvents();
}

function bindEvents() {
    $("#mainLogOutBtn").on("click", logOut);
    $("#mainShowUsersBtn").on("click", notImplementedAlert);
    $("#mainOpenForum").on("click", notImplementedAlert);
    $("#mainAddWorkOuts").on("click", notImplementedAlert);
    $("#mainShowWorkOuts").on("click", notImplementedAlert);
    $("#mainShowBestWorkOut").on("click", notImplementedAlert);
    $("#mainShowTotalKM").on("click", notImplementedAlert);
}

function exitIfNotLogged() {
    if (!currentUser) {
        window.location.href = "../index.html";
    }
}

function logOut() {
    logOutUsuario();
    window.location.href = "../index.html";
}

function notImplementedAlert() {
    alert("Funcionalidad no implementada aún.");
}