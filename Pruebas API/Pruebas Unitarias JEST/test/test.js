const {sumar, restar} = require('../index');

describe('Prueba Operaciones Aritmeticas', ()=>{
        it('La siguiente prueba debe de operar una suma de dos digitos', async () => {
            expect(sumar(2, 3)).toBe(7);
        });

        it('La siguiente prueba debe de operar otros de dos digitos', async () => {
            expect(sumar(10, 15)).toBe(25);
        });
});

describe('Prueba Operaciones Aritmeticas test', ()=>{
    it('La siguiente prueba debe de operar una suma de dos digitos', async () => {
        expect(sumar(2, 3)).toBe(7);
    });

    it('La siguiente prueba debe de operar otros de dos digitos', async () => {
        expect(sumar(10, 15)).toBe(25);
    });
});

