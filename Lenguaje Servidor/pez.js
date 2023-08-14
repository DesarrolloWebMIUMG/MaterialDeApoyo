const Animal = require('./animal.js');

class Pez extends Animal {
  constructor(nombre, edad, descripcion, habitat) {
    super(nombre, edad, descripcion);
    this.habitat     = habitat;
    this.descripcion = descripcion;
  }

  getInformacion() {
    return `${super.getInformacion()}. Hábitat: ${this.habitat}`;
  }
}


module.exports = Pez;