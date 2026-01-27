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

