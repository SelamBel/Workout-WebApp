import { guardarUsuario, loginUsuario } from "./userLocalStorage.js";
import Usuario from "./Usuario.js";


$(document).ready(function () {
    init();
});

function init() {
    startImageRotation();
    bindEvents();
}

function bindEvents() {
    $("#rotationImage").on("click", changePic);
    $("#loginBtn").on("click", toggleLogin);
    $("#registerBtn").on("click", toggleRegister);
    $("#submitLogin").on("click", submitLogin);
    $("#submitRegister").on("click", submitRegister);
}

const images = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"];
const imagePath = "app/assets/images/";

function startImageRotation() {
    setInterval(changePic, 5000);
}

function changePic() {
    const $img = $("#rotationImage");
    const currentSrc = $img.attr("src");
    const currentImage = currentSrc.split("/").pop();
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;

    $img.attr("src", imagePath + images[nextIndex]);
}

function toggleLogin() {
    $("#loginCard").toggleClass("hidden");
    $("#registerCard").addClass("hidden");
}

function toggleRegister() {
    $("#registerCard").toggleClass("hidden");
    $("#loginCard").addClass("hidden");
}

function submitLogin() {
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();
}

function submitRegister() {
    const username = $("#registerUsername").val();
    const password = $("#registerPassword").val();
    const email = $("#registerEmail").val();
    const height = $("#registerHeight").val();
    const weight = $("#registerWeight").val();
    const age = $("#registerAge").val();
    let registerUserDate = new Usuario(username, password, email, height, weight, age);
    if (!registerUserDate) {
        alert("Error en el registro. Por favor, inténtalo de nuevo.");
        return;
    }

    const success = guardarUsuario(registerUserDate);

    if (success) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        toggleRegister();
    } else {
        alert("La combinación de usuario con correo ya existe. Por favor, elige otro.");
    }

}
