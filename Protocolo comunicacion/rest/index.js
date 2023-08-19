const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/usuario/:dpi', (req, res) => {
  const dpi = req.params.dpi;
  const apellido = req.query.apellido;
  const nombre = req.body.nombre;
  const usuario = {
    dpi: dpi,
    apellido: apellido,
    nombre: nombre
  };

  if (!nombre) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(usuario);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



