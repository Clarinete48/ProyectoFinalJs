class Gi {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(gi, cantidad) {
        this.gi = gi;
        this.cantidad = cantidad;
    }
}

//Definición de constantes

const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays de gis
const gis = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

//Ejecución de funciones

cargarGis();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoGis();

//Definiciones de funciones


function cargarGis() {
    gis.push(new Gi(1231, 'Infamy Jiu Jitsu Gi', 150, './img/InfamyGi.png'));
    gis.push(new Gi(1232, 'Reaper Ominous Jiu Jitsu Gi', 145, './img/ReaperOminousGi.png'));
    gis.push(new Gi(1233, 'Patriot Reborn Jiu Jitsu Gi', 155, './img/PatriotRebornGi.png'));
    gis.push(new Gi(1234, 'Triumph Jiu Jitsu Gi', 140, './img/TriumphGi.png'));
    gis.push(new Gi(1235, 'Infinite Jiu Jitsu Gi', 150, './img/InfiniteGi.png'));
    gis.push(new Gi(1236, 'Shadow Jiu Jitsu Gi', 150, './img/ShadowGi.png'));
    gis.push(new Gi(1237, 'Equilibrium Jiu Jitsu Gi', 105, './img/EquilibriumGi.png'));
    gis.push(new Gi(1238, 'Echo Jiu Jitsu Gi', 105, './img/EchoGi.png'));
    gis.push(new Gi(1239, 'Competitor Jiu Jitsu Gi', 160, './img/CompetitorGi.png'));
}

function cargarCarrito() {
    /*let elementoCarrito = new ElementoCarrito(
        new Gi(1231, 'Infamy Jiu Jitsu Gi', 150, './img/InfamyGi.png'),
        1
    );

    elementosCarrito.push(elementoCarrito);*/
}

function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.gi.id}</td>
                <td>${elemento.gi.nombre}</td>
                <td><input id="cantidad-producto-${elemento.gi.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.gi.precio}</td>
                <td>$ ${estandarDolaresAmericanos.format(elemento.gi.precio*elemento.cantidad)}</td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.gi.precio;

            //Evento carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.gi.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

        }
    );

    //contenedor CarritoCompras
    
    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">El carrito está vacío</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
        `;
    }

}

let finalizar=document.getElementById("comprarAhora");
finalizar.onclick=()=>{
    Swal.fire({
        title: '¡Pedido confirmado!',
        text: 'Estamos preparando todo para el envío.',
    });
}


function crearCard(gi) {
    //Button
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-dark";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${gi.nombre}</h5>
        <p>$ ${gi.precio} USD</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = gi.foto;
    imagen.className = "card-img-top";
    imagen.alt = gi.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);


    //Eventos
    botonAgregar.onclick = () => {
      

        let elementoCarrito = new ElementoCarrito(gi, 1);
        elementosCarrito.push(elementoCarrito);

        dibujarCarrito();

        swal({
            title: "¡Gi agregado!",
            text: `${gi.nombre} se agregó al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ver carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Ir al carrito");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoGis() {
    contenedorProductos.innerHTML = "";

    gis.forEach(
        (gi) => {
            let contenedorCarta = crearCard(gi);
            contenedorProductos.append(contenedorCarta);
        }
    );

}


//Boton con cambio de color 

//for (const botonAgregar of gi) {
//    
//    botonAgregar.onmouseover = () => {
//        console.log("¿Quieres comprar un Gi?");
//        botonAgregar.className="btn btn-light";
//    }
//    
//    botonAgregar.onmouseout = () => {
//        botonAgregar.className="btn btn-dark";
//    }
//        
//}   



//E. de teclado
let campoNombre=document.getElementById("nombre");

campoNombre.oninput=()=>{
    if(isNaN(campoNombre.value)){
        campoNombre.style.color="black";
    }else{
        campoNombre.style.color="red";
    }
}

//E. Submit
let formulario=document.getElementById("formulario");
formulario.addEventListener("submit",validarFormulario);

function validarFormulario(ev){
    if((campoNombre.value=="")||(!isNaN(campoNombre.value))){
        ev.preventDefault();
        Swal.fire("Ingrese nombre válido");
    }
}

//E. Detectar Enter
//function capturarEnter(e){
//    if(e.keycode==13 || e.which==13){
//        Swal.fire("Presionaste ENTER")
//    } 
//}


//Fetch

function obtenerJsonLocal(){
    const URLJSON="users.json";
    fetch(URLJSON)
        .then( resp => resp.json())
        .then( data => {
            console.log(data.usuarios);
        })
}

obtenerJsonLocal();