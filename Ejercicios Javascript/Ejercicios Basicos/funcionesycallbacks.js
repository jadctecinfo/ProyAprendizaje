function saludar (nombre) {
    console.log(`Hola, ${nombre}!`);
}
saludar ("Jaime")

let numeros = [1, 2, 3, 4, 5];

function procesar(array, callback) {
    for (let i = 0; i < array.length; i++) {
        console.log(callback(array[i]));
    }
}

function cuadrado(numero) {
    return numero * numero;
}

procesar(numeros, cuadrado);


