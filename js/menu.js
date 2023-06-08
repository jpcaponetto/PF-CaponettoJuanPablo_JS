const abrirMenuMobile = document.querySelector("#abrir-menu-mobile");
const cerrarMenuMobile = document.querySelector("#cerrar-menu-mobile");
const aside = document.querySelector("aside");

abrirMenuMobile.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

cerrarMenuMobile.addEventListener("click", ()=> {
    aside.classList.remove("aside-visible");
})

menuBoton.forEach(boton => boton.addEventListener("click", () => {        // hay que hacer un foreach porque es un array
    aside.classList.remove("aside-visible");
}))