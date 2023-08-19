const express = require('express');
const soap = require('soap');
const app = express();
const port = 3000;

app.use(express.static('public'));

// URL del servicio SOAP
const url = 'https://banguat.gob.gt/variables/ws/TipoCambio.asmx?wsdl';

// Ruta para la consulta del servicio SOAP
app.get('/consulta', (req, res) => {
  const method = 'TipoCambioDia';
  const args = {
    fechainit: '17/08/2023',
    moneda: 'dolar',
  };

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error('Error al crear el cliente SOAP:', err);
      res.status(500).json({ error: 'Error al crear el cliente SOAP' });
      return;
    }

    client[method](args, (err, result) => {
      if (err) {
        console.error('Error al llamar al método:', err);
        res.status(500).json({ error: 'Error al llamar al método' });
        return;
      }

      res.json(result);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
