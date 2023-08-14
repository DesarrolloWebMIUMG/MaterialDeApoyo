class Animal {
    constructor(nombre, edad, descripcion) {
      this.nombre = nombre;
      this.edad = edad;
      this.descripcion = descripcion;
    }

    getInformacion() {
      return `${this.nombre}, ${this.edad} años. Descripción: ${this.descripcion}`;
    }
  }
  

  module.exports = Animal;