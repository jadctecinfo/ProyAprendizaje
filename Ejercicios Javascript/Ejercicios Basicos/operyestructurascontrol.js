//operadores

let num1=100;
let num2=250;

console.log(num1+num2);
console.log(num1-num2);
console.log(num1*num2);
console.log(num1/num2);
console.log(num1%num2);
console.log(num1**2); // Exponentiation operator

// estructuras de control if else else if

let edad=10;
if (edad >= 18) {
    console.log("Eres mayor de edad");
}
else {
    console.log("Eres menor de edad");
}

//bucles

for (let i = 1; i < 5; i++) {
    console.log("Número: " + i);
}

let rolUsuario = "Administrador de la app".toLowerCase();

const mensajes = {
    "admin": "Bienvenido, administrador",
    "administrador de la app": "Bienvenido, administrador",
    "usuario": "Bienvenido, usuario",
    "usuario de la app": "Bienvenido, usuario",
    "invitado": "Bienvenido, invitado",
    "invitado de la app": "Bienvenido, invitado"
};

if (mensajes[rolUsuario]) {
    console.log(mensajes[rolUsuario]);
} else {
    console.log("Usuario no reconocido, por favor verifica tus credenciales");
}

//bucle recorrer productos
let productos = [
    { nombre: "camisa", precio: 100 },
    { nombre: "Pantralon", precio: 200 },
    { nombre: "zapatos", precio: 300 }
];

for (let i=0; i < productos.length; i++) {
    console.log("Producto: " + productos[i].nombre + ", Precio: " + productos[i].precio);
}

//array carrito de compras

let carrito = [
    { nombre: "camisa", precio: 100 },
    { nombre: "Pantralon", precio: 200 },
    { nombre: "zapatos", precio: 300 }
];

let total = 0;
for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
}
console.log("Total de la compra: " + total);

// estructuras con switch

let dia = 3; // 1: Lunes, 2: Martes, 3: Miércoles, 4: Jueves, 5: Viernes, 6: Sábado, 7: Domingo

switch (dia) {
    case 1:
        console.log("Hoy es Lunes");
        break;
    case 2:
        console.log("Hoy es Martes");
        break;
    case 3:
        console.log("Hoy es Miércoles");
        break;
    case 4:
        console.log("Hoy es Jueves");
        break;
    case 5:
        console.log("Hoy es Viernes");
        break;
    case 6:
        console.log("Hoy es Sábado");
        break;
    case 7:
        console.log("Hoy es Domingo");
        break;
    default:
        console.log("Día no válido");
}

//array para suma de numeros

let numeros = [10, 20, 30, 40, 50];
let suma = 0;
for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}
console.log("La suma de los números es: " + suma);

// array de strings y devolver un nuevo array con las cadenas en mayusculas

let nombres = ["juan", "pedro", "maria", "luisa"];
let nombresMayusculas = [];
for (let i = 0; i < nombres.length; i++) {
    nombresMayusculas.push(nombres[i].toUpperCase());
}
console.log("Nombres en mayúsculas: " + nombresMayusculas.join(", "));

// array de numeros y devolver un nuevo array con los numeros pares
let numerosArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let numerosPares = [];
for (let i = 0; i < numerosArray.length; i++) {
    if (numerosArray[i] % 2 === 0) {
        numerosPares.push(numerosArray[i]);
    }
}
console.log("Números pares: " + numerosPares.join(", "));

// array de objetos

let estudiantes = [
    { nombre: "Juan", edad: 20, curso: "Matemáticas" },
    { nombre: "Pedro", edad: 22, curso: "Historia" },
    { nombre: "María", edad: 21, curso: "Ciencias" },
    { nombre: "Luisa", edad: 23, curso: "Literatura" }
];
let estudiantesMayores = [];
for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].edad >= 18) {
        estudiantesMayores.push(estudiantes[i]);
    }
}
console.log("Estudiantes mayores de edad: ");
for (let i = 0; i < estudiantesMayores.length; i++) {
    console.log(estudiantesMayores[i].nombre + ", Edad: " + estudiantesMayores[i].edad + ", Curso: " + estudiantesMayores[i].curso);
}
// array de objetos y filtrar por un criterio
let listaProductos = [
    { nombre: "camisa", precio: 100 },
    { nombre: "Pantralon", precio: 200 },
    { nombre: "zapatos", precio: 300 },
    { nombre: "chaqueta", precio: 150 }
];


let productosFiltrados = listaProductos.filter(producto => producto.precio > 150);
console.log("Productos con precio mayor a 150:");
for (let i = 0; i < productosFiltrados.length; i++) {
    console.log(productosFiltrados[i].nombre + ", Precio: " + productosFiltrados[i].precio);
}

// USO DE MAP PARA CON PRECIOS INCREMENTADOS

let listaproductos = [
    { nombre: "camisa", precio: 100 },
    { nombre: "Pantralon", precio: 200 },
    { nombre: "zapatos", precio: 300 },
    { nombre: "chaqueta", precio: 150 }
];

let productosaumentados = listaproductos.map(function(producto) {
    return {
        nombre: producto.nombre,
        precio: producto.precio * 1.1 // Aumenta el precio en un 10%
    };
});

console.log("Productos con precios aumentados:");
for (let i = 0; i < productosaumentados.length; i++) {
    console.log(productosaumentados[i].nombre + ", Precio aumentado: " + productosaumentados[i].precio);
}

let listaproductos1 = [
    { nombre: "camisa", precio: 100 },
    { nombre: "Pantralon", precio: 200 },
    { nombre: "zapatos", precio: 300 },
    { nombre: "chaqueta", precio: 150 }
];

console.log("Productos con precios mayores a 200:");
productosFiltrados = listaproductos1.filter(function(producto) {
    return producto.precio > 200;
});
for (let i = 0; i < productosFiltrados.length; i++) {
    console.log(productosFiltrados[i].nombre + ", Precio: " + productosFiltrados[i].precio);
}

// usar reduce para calcular el total de precios de todos los productos.
let listaProductos2 = [
    { nombre: "camisa", precio: 100 },
    { nombre: "Pantralon", precio: 200 },
    { nombre: "zapatos", precio: 300 },
    { nombre: "chaqueta", precio: 150 }
];
let totalPrecios = listaProductos2.reduce(function(acumulador, producto) {
    return acumulador + producto.precio;
}, 0);
console.log("Total de precios de todos los productos: " + totalPrecios);






