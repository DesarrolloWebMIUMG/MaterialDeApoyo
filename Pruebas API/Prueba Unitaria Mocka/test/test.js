const assert = require('assert');
const {sumar}  = require('../index');

describe('Función sumar', () => {
    it('debería sumar dos números correctamente', () => {
      assert.strictEqual(sumar(2, 3), 5);
      assert.strictEqual(sumar(0, 0), 0);
      assert.strictEqual(sumar(-1, 1), 20);
    });
  
    it('debería manejar números decimales', () => {
      assert.strictEqual(sumar(1.5, 2.5), 4);
      assert.strictEqual(sumar(-1.5, 1.5), 0);
    });
  
    it('debería manejar números negativos', () => {
      assert.strictEqual(sumar(-2, -3), -5);
      assert.strictEqual(sumar(-1, 1), 0);
    });
  });  
