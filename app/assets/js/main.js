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