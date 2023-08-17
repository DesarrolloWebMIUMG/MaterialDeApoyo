const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Swagger API',
      version: '1.0.0',
    },
  },
  apis: ['index.js'], // Especifica aquí los archivos donde tienes las definiciones de tus rutas
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene información
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             example:
 *               message: Información obtenida con éxito
 */
app.get('/', (req, res) => {
  res.json({ message: 'Información obtenida con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
