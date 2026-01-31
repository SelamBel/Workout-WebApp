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
    $("#mainFindWorkOuts").on("click", setUpFindWorkOuts);
    $("#mainShowBestWorkOut").on("click", () => toggleCards("card-showBestWorkOut"));
    $("#mainShowTotalKM").on("click", showTotalKM);

    $("#submitAddWorkOut").on("click", submitWorkOut);
    $("#submitFindWorkOut").on("click", findWorkOut);
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
    $(".created-card").remove()
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
    createWorkOutList(currentUser.entrenamientos, "Entrenamientos de " + currentUser.nombre);
}

function createWorkOutList(entrenamientos, titulo) {
    const card = CardMaker.createCard();
    CardMaker.setCardTitle(card, titulo);
    const content = CardMaker.createCardContent(card);

    if (!entrenamientos || entrenamientos.length === 0) {
        CardMaker.addElement(content, "p", { text: `No hay entrenamientos para mostrar.` });
        container.append(card);
        return;
    }

    const lista = CardMaker.createContainer(content, "ul", "lista-entrenamientos");
    entrenamientos.forEach((entrenamiento, index) => {
        const cardEntrenamiento = CardMaker.createContainer(lista, "li", "card-entrenamiento");
        CardMaker.addElement(cardEntrenamiento, "h3", { text: `Entrenamiento #${index + 1}`, class: `entrenamiento-titulo` });
        CardMaker.addElement(cardEntrenamiento, "p", { text: `Distancia: ${entrenamiento.distancia} km`, class: "entrenamiento-distancia" });
        CardMaker.addElement(cardEntrenamiento, "p", { text: `Tiempo: ${entrenamiento.tiempo} min`, class: "entrenamiento-tiempo" });
        CardMaker.addElement(cardEntrenamiento, "p", { text: `Velocidad: ${entrenamiento.velocidad} km/h`, class: "entrenamiento-velocidad" });
        CardMaker.addElement(cardEntrenamiento, "p", { text: `Nivel de esfuerzo: ${entrenamiento.nivelEsfuerzo}`, class: "entrenamiento-esfuerzo" });

        const fecha = new Date(entrenamiento.fecha).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        CardMaker.addElement(cardEntrenamiento, "p", { text: `Fecha: ${fecha}`, class: "entrenamiento-fecha" });

        const btnBorrar = CardMaker.addElement(cardEntrenamiento, "button", { text: `Borrar`, class: "btn-borrar-entrenamiento" });
        $(btnBorrar).on('click', () => {
            borrarEntrenamiento(index);
        });

        lista.append(cardEntrenamiento);
    });
    container.append(card);
};

function borrarEntrenamiento(indice) {
    if (confirm(`¿Estás seguro de que quieres borrar el entrenamiento #${indice + 1}?`)) {
        currentUser.entrenamientos.splice(indice, 1);

        if (updateCurrentUser(currentUser)) {
            showWorkOuts();
        } else {
            alert("Error al borrar el entrenamiento");
        }
    }
}

function setUpFindWorkOuts() {
    toggleCards("card-findWorkOut");
    let fechaInicio = $("#dateStart");
    let fechaFin = $("#dateEnd");
    const hoy = new Date().toISOString().split('T')[0];

    const primerDiaMes = new Date();
    primerDiaMes.setDate(1);
    const primerDiaMesStr = primerDiaMes.toISOString().split('T')[0];

    fechaFin.val(hoy).attr("max", hoy);
    fechaInicio.val(primerDiaMesStr).attr("max", hoy);
}

function findWorkOut() {
    toggleCards("card-findWorkOut");
    let fechaInicio = new Date($("#dateStart").val());
    let fechaFin = new Date($("#dateEnd").val());
    
    fechaFin.setHours(23, 59, 59, 999);
    
    let title = "Búsqueda entre " + $("#dateStart").val() + " y " + $("#dateEnd").val();

    if (fechaInicio > fechaFin) {
        const card = CardMaker.createCard();
        CardMaker.setCardTitle(card, title);
        const content = CardMaker.createCardContent(card);
        CardMaker.addElement(content, "p", {text: "La fecha de inicio no puede ser mayor a la de fin."});
        container.append(card);
        return;
    }

    const entrenamientosFiltrados = currentUser.entrenamientos.filter(entrenamiento => {
        const fechaEntrenamiento = new Date(entrenamiento.fecha);
        return fechaEntrenamiento >= fechaInicio && fechaEntrenamiento <= fechaFin;
    });

    createWorkOutList(entrenamientosFiltrados, title);
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

    const ulBestWorkOut = CardMaker.createContainer(content, "ul", "best-workout");
    CardMaker.addElement(ulBestWorkOut, "li", { text: `Distancia: ${mejorEntrenamiento.distancia} km` });
    CardMaker.addElement(ulBestWorkOut, "li", { text: `Tiempo: ${mejorEntrenamiento.tiempo} min` });
    CardMaker.addElement(ulBestWorkOut, "li", { text: `Velocidad: ${mejorEntrenamiento.velocidad}` });
    CardMaker.addElement(ulBestWorkOut, "li", { text: `Nivel: ${mejorEntrenamiento.nivelEsfuerzo}` });
    const fecha = new Date(mejorEntrenamiento.fecha).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    CardMaker.addElement(ulBestWorkOut, "li", { text: `Fecha: ${fecha}` });
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
    CardMaker.addElement(content, "p", { text: `Has recorrido un total de ${sumKM} km. Bien hecho.` });
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