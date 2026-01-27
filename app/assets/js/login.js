setInterval(changePic, 5000);
$("#rotationImage").on("click", function () {
    changePic();
});

function changePic() {
    const currentSrc = $("#rotationImage").attr("src");
    const images = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"];
    const current = currentSrc.split("/").pop();
    const idx = images.indexOf(current);
    const nextIdx = (idx + 1) % images.length;
    $("#rotationImage").attr("src", "app/assets/images/" + images[nextIdx]);
}
