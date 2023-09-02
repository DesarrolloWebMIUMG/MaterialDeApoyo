const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://usuario:pass@cluster0.wrnv60d.mongodb.net/Salud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Definir un modelo para la colección "tasks"
const Task = mongoose.model('Task', {
  titulo: String,
  descripcion: String,
  completed: { type: Boolean, default: false },
});

// Rutas para la API REST
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
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
