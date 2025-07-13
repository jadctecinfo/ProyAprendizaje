// pantalla para mostrar numeros y resultados
const pantalla = document.getElementById('pantalla');

// variable para almacenar la expresión
let expresion = '';

// actualizar pantalla con el contenido de expresion
function actualizarPantalla() {
    pantalla.textContent = expresion || '0';
}

// funcion para manejar click en botones
function manejarClick(event) {
    const valor = event.target.getAttribute('data-valor');
    if (valor === 'C') {
        expresion = '';
    } else if (valor === '=') {
        try {
            expresion = eval(expresion).toString();
        } catch {
            expresion = 'Error';
        }
    } else {
        expresion += valor;
    }
    actualizarPantalla();
}

// agregar event listener a los botones con clase "boton"
document.querySelectorAll('.boton').forEach(button => {
    button.addEventListener('click', manejarClick);
});

// inicializar pantalla
actualizarPantalla();