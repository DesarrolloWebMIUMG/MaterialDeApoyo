const Animal = require('./animal.js');

class Ave extends Animal {
  constructor(nombre, edad, description, envergadura) {
    super(nombre, edad, description);
    this.envergadura = envergadura;
  }

  getDescripcion() {
    return `${super.getInformacion()}. Envergadura: ${this.envergadura} cm`;
  }
}

module.exports = Ave;