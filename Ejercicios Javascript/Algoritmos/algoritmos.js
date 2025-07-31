// suma de dos numeros
let a = 5;
let b = 10;
let suma = a + b;
console.log("La suma de a y b es: " + suma);

// decisiones condicionales

let edad = 18;
if (edad >= 18) {
    console.log("Eres mayor de edad");
} else {
    console.log("Eres menor de edad");
}
 
// bucles
for (let i = 10; i < 10; i++) {
    console.log("El valor de i es: " + i);
}

// funcion para encontrar el numero maximo

function encontrarMaximo(num1, num2, num3, num4, num5) {
    let maximo = num1;
    if (num2 > maximo) maximo = num2;
    if (num3 > maximo) maximo = num3;
    if (num4 > maximo) maximo = num4;
    if (num5 > maximo) maximo = num5;
    return maximo;
}
let maximo = encontrarMaximo(5, 10, 15, 20, 25);
console.log("El número máximo es: " + maximo);

//funcion sumar en array
function sumarArray(numeros) {
    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }
    return suma;
}
let resultado = sumarArray([1, 2, 3, 4, 5]);
console.log("La suma del array es: " + resultado);

// multiplicar los numeros de un array

function factorArray (numeros) {
    let producto = 1;
    for (let i = 0; i < numeros.length; i++) {
        producto *= numeros[i];
    }
    return producto;
}
let resultadoProducto = factorArray([1, 2, 3, 4, 5]);
console.log("El producto del array es: " + resultadoProducto);

// Solicitar al usuario su nombre y realizar operaciones matemáticas

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Por favor Ingresa Tu Nombre completo: ', (nombreCompleto) => {
    console.log(`Hola ${nombreCompleto}, bienvenido al programa!`);

    rl.question('Ingresa el primer número: ', (num1) => {
        rl.question('Ingresa el segundo número: ', (num2) => {
            rl.question('¿Qué operación quieres realizar? (suma, resta, multiplicacion, division): ', (operacion) => {
                let resultado;
                const n1 = Number(num1);
                const n2 = Number(num2);
                switch (operacion.toLowerCase()) {
                    case 'suma':
                        resultado = n1 + n2;
                        break;
                    case 'resta':
                        resultado = n1 - n2;
                        break;
                    case 'multiplicacion':
                        resultado = n1 * n2;
                        break;
                    case 'division':
                        if (n2 !== 0) {
                            resultado = n1 / n2;
                        } else {
                            console.log('Error: División por cero no permitida.');
                            rl.close();
                            return;
                        }
                        break;
                    default:
                        console.log('Operación no reconocida.');
                        rl.close();
                        return;
                }
                console.log(`El resultado de la ${operacion} es: ${resultado}`);
                rl.close();
            });
        });
    });
});
