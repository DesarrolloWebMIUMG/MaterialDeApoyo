const Pez = require('./pez.js');
const Ave = require('./ave.js');
const Animal = require('./animal.js');

// Crear instancias de diferentes tipos de animales
const Leon = new Animal('León', 5, 'Un majestuoso depredador');
const Aguila = new Ave('Águila', 10, 'Un ave de presa poderosa', 180);
const Tiburon = new Pez('Tiburón', 20, 'Un feroz depredador marino', 'Océano');

// Mostrar información de los animales
console.log(Leon.getInformacion());
console.log(Aguila.getDescripcion());
console.log(Tiburon.getInformacion());