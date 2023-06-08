let carritoProductos = localStorage.getItem("productos-en-carrito");
carritoProductos = JSON.parse(carritoProductos);

const botonVaciar = document.querySelector("#vaciar-carrito");
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-compra-realizada");
const botonComprar = document.querySelector("#carrito-comrar")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
    if (carritoProductos && carritoProductos.length > 0){
        contenedorCarritoVacio.classList.add("pantalla-desactivada");             // Si hay productos en carrito, carrito vacio tiene la clase pantalla desactivada 
        contenedorProductos.classList.remove("pantalla-desactivada");            // Remuevo la clase Disabled de los contenedores Prodcutos y Acciones
        contenedorCarritoAcciones.classList.remove("pantalla-desactivada");
        contenedorCarritoComprado.classList.add("pantalla-desactivada");
    
        contenedorProductos.innerHTML = "";
    
    
        carritoProductos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-prod-img" src="${producto.imagen}" alt="${producto.titulo}" />
            <div class="carrito-producto-titulo">
            <small>${producto.titulo}</small>
            <h3></h3>
            </div>
            <div class="carrito-producto-cantidad">
            <small>${producto.cantidad}</small>
            <p></p>
            </div>
            <div class="carrito-producto-precio">
            <small>$${producto.precio}</small>
            <p></p>
            </div>
            <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}">
            <i class="bi bi-trash-fill"></i>
            </button>
            </div>
            `
            contenedorProductos.append(div);
        });
    
    } else{
        contenedorCarritoVacio.classList.remove("pantalla-desactivada");             // Si hay productos en carrito, carrito vacio tiene la clase pantalla desactivada 
        contenedorProductos.classList.add("pantalla-desactivada");            // Remuevo la clase Disabled de los contenedores Prodcutos y Acciones
        contenedorCarritoAcciones.classList.add("pantalla-desactivada");
        contenedorCarritoComprado.classList.add("pantalla-desactivada");
    
    }
    actualizarBotonesEliminar(); 
    totalActualizado()
}

cargarProductosCarrito();


// Botones de borrar productos 
function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}


// Eliminar Carrito
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = carritoProductos.findIndex(producto => producto.id === idBoton);
    // const productoEliminado = carritoProductos.find(producto => producto.id === idBoton);
    carritoProductos.splice(index, 1); // que se elimina desde el index y solamente un producto .
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));  
    Toastify({
        text: "Tu producto se eliminó al carrito",
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
}




// Vaciar Carrito
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){


    Swal.fire({
        title: 'Estás seguro?',
        icon: 'question',
        html:
          'Se borraran todos tus producto, no podrás revertir esta acción',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Sí, vaciar carrito!',
        cancelButtonText:
          'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            carritoProductos.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));  
            cargarProductosCarrito();
        }
      })



}

function totalActualizado() {
    const totalCalculado = carritoProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `${totalCalculado}`;    
}




// Vaciar Carrito
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    carritoProductos.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));  
    contenedorCarritoVacio.classList.add("pantalla-desactivada");             
    contenedorProductos.classList.add("pantalla-desactivada");            
    contenedorCarritoAcciones.classList.add("pantalla-desactivada");
    contenedorCarritoComprado.classList.remove("pantalla-desactivada");
}
