let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargadeProductos(productos);
    })


    // DOM 
    const productosContainer = document.querySelector("#productos-container");
    const menuBoton = document.querySelectorAll(".menu-boton");
    const titutoPrincipal = document.querySelector("#principal");
    let botonAgregarCarrito = document.querySelectorAll(".boton-agregar-carrito");
    const numero = document.querySelector("#numero");


    console.log(botonAgregarCarrito);

    function cargadeProductos(productosE){
        productosContainer.innerHTML = "";  
        productosE.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img
                        class="producto-img"   
                        src= "${producto.imagen}"
                        alt="${producto.titulo}"
                    />
            <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="boton-agregar-carrito" id="${producto.id}">Agregar</button>
            </div>
            </div>
            `;

            productosContainer.append(div);
        })
        actualizarBotonAgregar();
    }


cargadeProductos(productos);

menuBoton.forEach(boton => {
    boton.addEventListener("click", (e)=> {

        menuBoton.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {                  
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            titutoPrincipal.innerText =  productoCategoria.categoria.nombre;

            const botonProductos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargadeProductos(botonProductos);
        } else {
            titutoPrincipal.innerText = "Todos los productos";
            cargadeProductos(productos); 
        }

    })
})


function actualizarBotonAgregar(){
    botonAgregarCarrito = document.querySelectorAll(".boton-agregar-carrito");
    botonAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    });
}

let carritoProductos;

let carritoProductosEnLS = localStorage.getItem("productos-en-carrito");

if (carritoProductosEnLS){
carritoProductos = JSON.parse(carritoProductosEnLS);       
    numeroActualizado();
} else {
    carritoProductos = [];  //sino el carrito está vacio
}


function agregarCarrito(evento){
    Toastify({
        text: "Tu producto se agregó al carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #961818, #450101)",
        },
        onClick: function(){}
    }).showToast();
    const idClickeado = evento.currentTarget.id;   
    const productoAgregado = productos.find(producto => producto.id === idClickeado);  

if(carritoProductos.some(producto => producto.id === idClickeado)){         
    const indiceCarrito = carritoProductos.findIndex(producto => producto.id === idClickeado);
    carritoProductos[indiceCarrito].cantidad++;
    } else{
    productoAgregado.cantidad = 1;
    carritoProductos.push(productoAgregado);   
    }
    numeroActualizado();
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));  
}



function numeroActualizado(){
    let numeroNuevo = carritoProductos.reduce((acc, producto) => acc + producto.cantidad, 0);  
    numero.innerText = numeroNuevo;
}

