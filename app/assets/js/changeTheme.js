import { checkTheme, switchTheme } from "./userLocalStorage.js";

function applyTheme() {
    debugger;
    const theme = checkTheme() || "dark"; 
    if (theme === "light") {
        $("html").addClass("light");
    } else {
        $("html").removeClass("light");
        switchTheme("dark"); 
    }
}

function initThemeToggle() {
    
    $("#themeToggle").on("click", () => {
        debugger;
        $("html").toggleClass("light");
        const newTheme = $("html").hasClass("light") ? "light" : "dark";
        switchTheme(newTheme);
    });
}

$(document).ready(() => {
    applyTheme();
    initThemeToggle();
});