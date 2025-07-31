class Auto {
    constructor(marca, modelo,año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }

    mostrarInfo() {
        console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}`);
    }

}

const miAuto = new Auto("Toyota", "Corolla", 2020);
miAuto.mostrarInfo(); // Marca: Toyota, Modelo: Corolla, Año: 202


        