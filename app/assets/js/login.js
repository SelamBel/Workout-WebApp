import { guardarUsuario, loginUsuario } from "./userLocalStorage.js";
import Usuario from "./Usuario.js";

const CURRENT_USER = "currentUser";

$(document).ready(function () {
    init();
});

function init() {
    checkSavedUser();
    startImageRotation();
    bindEvents();
}

function checkSavedUser() {
    const savedUser = localStorage.getItem(CURRENT_USER);
    if (savedUser) {
        window.location.href = "app/main.html";
    }
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
    const user = loginUsuario(username, password);

    if (user) {
        window.location.href = "app/main.html";
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
}

function submitRegister() {
    let registerUserDate = checkValidity();
    if (!registerUserDate) {
        return;
    }

    const success = guardarUsuario(registerUserDate);
    if (success) {
        window.location.href = "app/main.html";
    } else {
        alert("La combinación de usuario con correo ya existe. Por favor, elige otro.");
    }

}

function checkValidity() {
    const username = $("#registerUsername").val();
    const email = $("#registerEmail").val();
    const password = $("#registerPassword").val();
    const confirmPassword = $("#registerPasswordConfirm").val();
    const name = $("#registerName").val();
    const height = $("#registerHeight").val();
    const weight = $("#registerWeight").val();
    const age = $("#registerAge").val();
    const gender = $("#registerGender").val();

    let errors = [];
    if (!username || username.length < 3) {
        errors.push("El nombre de usuario debe tener al menos 3 caracteres.");
    }

    if (!password || password.length < 6) {
        errors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errors.push("El correo electrónico no es válido.");
    }

    if (!name || name.length < 2) {
        errors.push("El nombre debe tener al menos 2 caracteres.");
    }

    if (height && (isNaN(height) || height < 100 || height > 250)) {
        errors.push("La altura debe estar entre 100 y 250 cm.");
    }

    if (weight && (isNaN(weight) || weight < 30 || weight > 300)) {
        errors.push("El peso debe estar entre 30 y 300 kg.");
    }

    if (age && (isNaN(age) || age < 16 || age > 120)) {
        errors.push("La edad debe estar entre 16 y 120 años.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return null;
    }

    return new Usuario(username, password, name, email, height, weight, age, gender);
}
