// app.test.js
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://sk8miguelvillatoro:Seguridad1_@cluster0.wrnv60d.mongodb.net/proyecto', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  describe('Registro de usuarios y autenticación de tokens', () => {
    it('debería registrar un usuario y devolver un token válido', async () => {
      const response = await request(app)
        .post('/registro')
        .send({ username: 'admin', password: 'admin' });
  
      expect(response.status).toBe(201);
  
      const loginResponse = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin' });
  
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeDefined();
    });
  
    it('debería devolver un error cuando se intenta iniciar sesión con credenciales incorrectas', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'usuario_incorrecto', password: 'contraseña_incorrecta' });
  
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Credenciales incorrectas');
    });
  
    it('debería devolver un error cuando se intenta acceder a una ruta protegida sin un token válido', async () => {
      const response = await request(app).get('/data');
  
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Token no proporcionado');
    });
  
    it('debería acceder a una ruta protegida con un token válido', async () => {
      const loginResponse = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin' });
  
      const token = loginResponse.body.token;
  
      const response = await request(app)
        .get('/data')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Ruta protegida');
      expect(response.body.user).toBe('admin');
    });
  });