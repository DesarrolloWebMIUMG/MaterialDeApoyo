const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

let HOST     = '192.168.50.74';
let Dialect  = 'postgres';
let DB       = 'postgres';
let USUARIO  = 'postgres';
let PASSWORD = 'postgres';

const sequelize = new Sequelize(DB, USUARIO, PASSWORD, {
  host: HOST,
  dialect: Dialect,
  logging: false, // Desactivar los logs de Sequelize
});

const Task = sequelize.define('Task', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  completo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync();

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const task = await Task.create({ titulo, descripcion });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
