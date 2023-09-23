const {sumar} = require('../index');

describe('Prueba Operaciones Aritmeticas', ()=>{
        it('La siguiente prueba debe de operar una suma de dos digitos', async () => {
            expect(sumar(2, 3)).toBe(5);
        });
        it('La siguiente prueba debe de operar una suma de dos digitos negativos', async () => {
            expect(sumar(-2, -2)).toBe(-4);
        });
        it('La siguiente prueba debe de operar una suma de dos digitos negativos', async () => {
            expect(sumar(0, -2)).toBe(-4);
        });
});

