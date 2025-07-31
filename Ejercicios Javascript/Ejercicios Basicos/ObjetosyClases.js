let persona = {
    nombre: "Jaime ",
    apellido: "Duran",
    edad: 48,
    profesion: "Ingeniero",
    saludar: function() {
        console.log(`Hola, me llamo ${this.nombre} ${this.apellido} mi profesion es: ${this.profesion} y tengo ${this.edad} años.`);
    }
};

persona.saludar();

// constructores

class persona {
    constructor(nombre, apellido, edad, profesion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.profesion = profesion;
    }

    saludar() {
        console.log(`Hola, me llamo ${this.nombre} ${this.apellido}, mi profesión es: ${this.profesion} y tengo ${this.edad} años.`);
    }
}

let persona2 = new persona("Ana", "Gomez", 30, "Arquitecta");
persona2.saludar();

// herencia

class Persona {
    constructor(nombre, apellido, edad, profesion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.profesion = profesion;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} ${this.apellido}, ${this.profesion}`);
    }
}

class Empleado extends Persona {
    constructor(nombre, apellido, edad, profesion, salario) {
        super(nombre, apellido, edad, profesion);
        this.salario = salario;
    }

    mostrarSalario() {
        console.log(`Mi salario es: ${this.salario}`);
    }
}

let empleado1 = new Empleado("Carlos", "Lopez", 35, "Desarrollador", 50000);
empleado1.saludar();
empleado1.mostrarSalario();
